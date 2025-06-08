import axios from "../lib/custom-axios";

export interface UserProps {
    _id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    role?: string;
    createdAt?: string;
    updatedAt?: string;
}

export const getUsers = async (): Promise<UserProps[]> => {
    const res = await axios.get("/users");
    return res.data;
}; 