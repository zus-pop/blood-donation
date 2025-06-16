// apis/bloodrequest.api.ts
import axios from "../lib/custom-axios";
import type { UserProps } from "./user.api";

export interface BloodRequestProps {
    _id: string;
    name: string;
    phone: string;
    bloodType: string;
    bloodComponent: string;
    quantity: number;
    status: string;
    address: string;
    requestedBy: UserProps;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface BloodRequestInput {
    name: string;
    phone: string;
    requestedBy: string;
    bloodType: string;
    bloodComponent: string;
    quantity: number;
    status?: string;
    address: string;
}


export const getBloodRequests = async (): Promise<BloodRequestProps[]> => {
    const res = await axios.get("/bloodrequests");
    return res.data;
};

export const createBloodRequest = async (data: BloodRequestInput): Promise<BloodRequestProps> => {
    const res = await axios.post("/bloodrequests", data);
    console.log(res.data);
    return res.data;
};

export const updateBloodRequest = async (id: string, data: Partial<BloodRequestInput>): Promise<BloodRequestProps> => {
    const res = await axios.patch(`/bloodrequests/${id}`, data);
    return res.data;
};

export const deleteBloodRequest = async (id: string): Promise<BloodRequestProps> => {
    const res = await axios.delete(`/bloodrequests/${id}`);
    return res.data;
};

export const getBloodRequestById = async (id: string): Promise<BloodRequestProps> => {
    const res = await axios.get(`/bloodrequests/${id}`);
    return res.data;
};
