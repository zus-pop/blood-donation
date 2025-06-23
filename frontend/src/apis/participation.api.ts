import axios from "../lib/custom-axios";

export interface ParticipationProps {
    _id?: string;
    user: string;
    event: string;
    status: "REGISTERED" | "CANCELLED" | "ATTENDED";
}

export const createParticipation = async (data: Omit<ParticipationProps, '_id'>): Promise<ParticipationProps> => {
    const res = await axios.post("/participations", data);
    return res.data;
};

export const getParticipations = async (userId: string): Promise<ParticipationProps[]> => {
    const res = await axios.get(`/participations?user=${userId}`);
    return res.data;
}; 