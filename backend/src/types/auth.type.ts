export interface AuthLoginDto {
  email: string;
  password: string;
}

export interface AuthRegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  role?: "MEMBER" | "STAFF" | "ADMIN" | "HOSPITAL";
}

export interface Payload {
  sub: string;
  email: string;
}
