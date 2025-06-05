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
    role?: string;
}