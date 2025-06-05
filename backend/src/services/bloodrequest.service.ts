import { BloodRequest } from "../models";
import { BloodRequestInput, BloodRequestQuery } from "../types/bloodrequest.type";

export class BloodRequestService {
    async createBloodRequest(data: BloodRequestInput) {
        const bloodRequest = new BloodRequest(data);
        return await bloodRequest.save();
    }

    async getBloodRequests(query: BloodRequestQuery) {
        const filter: BloodRequestQuery = {};

        if (query.userId) filter.userId = query.userId;
        if (query.bloodType) filter.bloodType = query.bloodType;
        if (query.bloodComponent) filter.bloodComponent = query.bloodComponent;
        if (query.status) filter.status = query.status;

        return BloodRequest.find(filter).populate("userId");
    }
}