import axios from "../lib/custom-axios";

export interface ParticipationProps {
    user: string;
    event: string;
    status: "REGISTERED" | "CANCELLED" | "ATTENDED";
}

export const createParticipation = async (data: ParticipationProps): Promise<any> => {
    const res = await axios.post("/participations", data);
    return res.data;
}; 