
import { User } from "../models";
import { UpdateUser, UserInput, UserQuery } from "../types/user.type";

export async function findUsers(query: UserQuery) {
  const users = await User.find(query).select("-password");
  return users;
}
export async function findActiveUsers(query: UserQuery) {
  const users = await User.find({ ...query, isDeleted: false }).select("-password");
  return users;
}
export async function createUser(data: UserInput) {
  const user = new User(data);
  return await user.save();
}
export async function findUserById(id: string) {
  const user = await User.findById(id).select("-password");
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}
export async function findUserByEmail(email: string) {
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new Error("User with this email not found");
  }
  return user;
}
export async function updateUser(id: string, data: UpdateUser) {
  const user = await User.findByIdAndUpdate(id, data, {
    runValidators: true,
    new: true,
  }).select("-password");
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}
export async function deleteUser(id: string) {
  const user = await User.findByIdAndUpdate(id, { isDeleted: true }, {
    new: true,
    runValidators: true,
  }).select("-password");
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}
