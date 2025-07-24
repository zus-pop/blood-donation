
import myAxios from "../lib/custom-axios";

export interface UserProps {
    _id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    password?: string;
    role?: string;
    isDeleted?: boolean;
    createdAt?: string;
    updatedAt?: string;
}


export const getUsers = async (): Promise<UserProps[]> => {
    const res = await myAxios.get("/users");
    return res.data;
};
export const getActiveUsers = async (): Promise<UserProps[]> => {
    const res = await myAxios.get("/users/active");
    return res.data;
};
// Lấy danh sách user đã bị xóa (isDeleted = true)
export const getDeletedUsers = async (): Promise<UserProps[]> => {
    const res = await myAxios.get("/users", { params: { isDeleted: true } });
    return res.data;
};
export const deleteUser = async (id: string): Promise<void> => {
    await myAxios.delete(`/users/${id}`);
};

export const updateUser = async (id: string, data: Partial<UserProps>): Promise<UserProps> => {
    const res = await myAxios.patch(`/users/${id}`, data);
    return res.data;
};

export const createUser = async (data: Omit<UserProps, "_id">): Promise<UserProps> => {
    const res = await myAxios.post("/users", data);
    return res.data;
};

