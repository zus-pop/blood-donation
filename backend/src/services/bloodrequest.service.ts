import { BloodRequest } from "../models";
import { BloodRequestQuery } from "@src/types/bloodrequest.type";

export class BloodRequestService {
    async createBloodRequest(data: any) {
        const bloodRequest = new BloodRequest(data);
        return await bloodRequest.save();
    }

    async getBloodRequests(query: BloodRequestQuery) {
        const { userId, bloodType, bloodComponent, status } = query;
        const filter: any = {};

        if (userId) filter.userId = userId;
        if (bloodType) filter.bloodType = bloodType;
        if (bloodComponent) filter.bloodComponent = bloodComponent;
        if (status) filter.status = status;

        return await BloodRequest.find(filter).populate("userId");
    }
}