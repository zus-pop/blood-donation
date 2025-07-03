import myAxios from "../lib/custom-axios";

export interface OnsiteCheckProps {
    _id?: string;
    participationId: string;
    pulseRate?: number;
    bloodPressure?: string;
    hemoglobinLevel?: number;
    bodyTemperature?: number;
    weight?: number;
    canDonate?: boolean;
    checkedAt?: string;
    createdAt?: string;
    updatedAt?: string;
}

export const createOnsiteCheck = async (data: Omit<OnsiteCheckProps, '_id' | 'createdAt' | 'updatedAt'>): Promise<OnsiteCheckProps> => {
    const res = await myAxios.post("/onsitechecks", data);
    return res.data;
};

export const getOnsiteChecks = async (): Promise<OnsiteCheckProps[]> => {
    const res = await myAxios.get(`/onsitechecks`);
    return res.data;
};

export const updateOnsiteCheck = async (id: string, data: Partial<OnsiteCheckProps>): Promise<OnsiteCheckProps> => {
    const res = await myAxios.put(`/onsitechecks/${id}`, data);
    return res.data;
};

export const deleteOnsiteCheck = async (id: string): Promise<void> => {
    await myAxios.delete(`/onsitechecks/${id}`);
};

export const getOnsiteCheckById = async (id: string): Promise<OnsiteCheckProps> => {
    const res = await myAxios.get(`/onsitechecks/${id}`);
    return res.data;
}; 