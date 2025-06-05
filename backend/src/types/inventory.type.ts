import { Types } from "mongoose";

export interface InventoryQuery {
    _id?: Types.ObjectId;
    bloodType: string;
    participation: Types.ObjectId;
    componentType: string;
    quantity: number;
    status: string;
}