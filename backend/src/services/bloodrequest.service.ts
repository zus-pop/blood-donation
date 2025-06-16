import mongoose from "mongoose";
import { BloodRequest, User } from "../models";
import { BloodRequestInput, BloodRequestQuery } from "../types/bloodrequest.type";


export async function createBloodRequest(data: BloodRequestInput) {
    const user = await User.findById(data.requestedBy);
    if (!user) {
        throw new Error("User not found");
    }

    const bloodRequest = new BloodRequest(data);
    return await bloodRequest.save();
}

export async function getBloodRequests(query: BloodRequestQuery) {
    const filter: BloodRequestQuery = {};

    if (query.name) filter.name = query.name;
    if (query.phone) filter.phone = query.phone;
    if (query.bloodType) filter.bloodType = query.bloodType;
    if (query.bloodComponent) filter.bloodComponent = query.bloodComponent;
    if (query.status) filter.status = query.status;
    if (query.requestedBy && mongoose.isValidObjectId(query.requestedBy)) {
        filter.requestedBy = query.requestedBy;
    } else if (query.requestedBy) {
        throw new Error("RequestedBy ID is wrong");
    }

    return BloodRequest.find(filter).populate("requestedBy");
}

export async function findBloodRequestById(id: string) {
    const bloodRequest = await BloodRequest.findById(id).populate("requestedBy");
    if (!bloodRequest) {
        throw new Error("Blood request not found");
    }
    return bloodRequest;
}
export async function updateBloodRequest(id: string, data: Partial<BloodRequestInput>) {
    const bloodRequest = await BloodRequest.findByIdAndUpdate(id, data, { new: true, runValidators: true }).populate("requestedBy");
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