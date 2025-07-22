import { User } from "../models";
import { AuthLoginDto, AuthRegisterDto, Payload } from "../types/auth.type";
import { createUser, findUserByEmail } from "./user.service";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export async function login(authLoginDto: AuthLoginDto) {
  const user = await findUserByEmail(authLoginDto.email);
  if (user.isDeleted) {
    throw new Error("The account does not exist");
  }
  const isMatched = await comparePassword(authLoginDto.password, user.password);

  //  compare hashed password with input password with bcrypt
  if (!isMatched) {
    throw new Error("Password not match!");
  }

  const payload: Payload = {
    sub: user._id.toString(),
    email: user.email,
  };

  const token = signToken(payload);

  return token;
}

export async function register(authRegisterDto: AuthRegisterDto) {
  const existed = await User.findOne({ email: authRegisterDto.email });

  if (existed) throw new Error("Email existed");

  //   Hash password with bcrypt first
  const hashedPassword = await hashPassword(authRegisterDto.password);

  const user = await createUser({
    email: authRegisterDto.email,
    password: hashedPassword,
    firstName: authRegisterDto.firstName,
    lastName: authRegisterDto.lastName,
    phone: authRegisterDto.phone,
    role: authRegisterDto.role || "MEMBER",
  });

  const token = signToken({
    sub: user._id.toString(),
    email: user.email,
  });

  return token;
}

export function signToken(payload: Payload) {
  return jwt.sign(payload, SECRET_KEY as string, { expiresIn: "1h" });
}

export function validateToken(token: string) {
  return jwt.verify(token, SECRET_KEY as string) as Payload;
}

async function hashPassword(password: string, saltRounds: number = 10) {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

async function comparePassword(password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword);
}
