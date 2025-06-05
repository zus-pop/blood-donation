import { Types } from "mongoose";

export interface BloodCompatibility {
    receiveFrom: Types.ObjectId[];
    donateTo: Types.ObjectId[];
}

export interface BloodQuery {
    _id?: Types.ObjectId;
    bloodType: string;
    compatibility: {
        wholeBlood: BloodCompatibility;
        rbc: BloodCompatibility;
        plasma: BloodCompatibility;
        platelets: BloodCompatibility;
    };
}