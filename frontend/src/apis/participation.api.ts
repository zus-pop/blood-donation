import myAxios from "../lib/custom-axios";

export interface ParticipationProps {
    _id?: string;
    user: string;
    event: string;
    status: "REGISTERED" | "CANCELLED" | "ATTENDED";
    createdAt?: string;
    updatedAt?: string;
}

export const createParticipation = async (data: Omit<ParticipationProps, '_id' | 'createdAt' | 'updatedAt'>): Promise<ParticipationProps> => {
    const res = await myAxios.post("/participations", data);
    return res.data;
};

export const getParticipations = async (): Promise<ParticipationProps[]> => {
    const res = await myAxios.get(`/participations`);
    return res.data;
};

export const updateParticipation = async (id: string, data: Partial<ParticipationProps>): Promise<ParticipationProps> => {
    const res = await myAxios.put(`/participations/${id}`, data);
    return res.data;
};

export const deleteParticipation = async (id: string): Promise<void> => {
    await myAxios.delete(`/participations/${id}`);
};

export const getParticipationById = async (id: string): Promise<ParticipationProps> => {
    const res = await myAxios.get(`/participations/${id}`);
    return res.data;
};