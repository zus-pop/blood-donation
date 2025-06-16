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
}

export interface Payload {
  sub: string;
  email: string;
}
