export interface UserQuery {
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: string;
}
export interface UserInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
    role?: "MEMBER" | "STAFF" | "ADMIN";
}
export interface UpdateUser {
    firstName: string;
    lastName: string;
    email: string;
    role?: string;
}