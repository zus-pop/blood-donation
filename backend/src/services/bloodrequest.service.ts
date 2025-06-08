import { BloodRequest, User } from "../models";
import { BloodRequestInput, BloodRequestQuery } from "../types/bloodrequest.type";


export async function createBloodRequest(data: BloodRequestInput) {
    const user = await User.findById(data.user);
    if (!user) {
        throw new Error("User not found");
    }
    const bloodRequest = new BloodRequest(data);
    return await bloodRequest.save();
}

export async function getBloodRequests(query: BloodRequestQuery) {
    const filter: BloodRequestQuery = {};

    if (query.user) filter.user = query.user;
    if (query.bloodType) filter.bloodType = query.bloodType;
    if (query.bloodComponent) filter.bloodComponent = query.bloodComponent;
    if (query.status) filter.status = query.status;

    return BloodRequest.find(filter).populate("user");
}

export async function findBloodRequestById(id: string) {
    const bloodRequest = await BloodRequest.findById(id).populate("user");
    if (!bloodRequest) {
        throw new Error("Blood request not found");
    }
    return bloodRequest;
}
export async function updateBloodRequest(id: string, data: Partial<BloodRequestInput>) {
    const bloodRequest = await BloodRequest.findByIdAndUpdate(id, data, { new: true }).populate("user");
    if (!bloodRequest) {
        throw new Error("Blood request not found");
    }
    return bloodRequest;
}
export async function deleteBloodRequest(id: string) {
    const bloodRequest = await BloodRequest.findByIdAndDelete(id);
    if (!bloodRequest) {
        throw new Error("Blood request not found");
    }
    return bloodRequest;
}