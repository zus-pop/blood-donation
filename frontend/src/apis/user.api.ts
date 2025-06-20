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

export const deleteUser = async (id: string): Promise<void> => {
    await axios.delete(`/users/${id}`);
};

export const updateUser = async (id: string, data: Partial<UserProps>): Promise<UserProps> => {
    const res = await axios.patch(`/users/${id}`, data);
    return res.data;
};

export const createUser = async (data: Omit<UserProps, "_id">): Promise<UserProps> => {
    const res = await axios.post("/users", data);
    return res.data;
}; 