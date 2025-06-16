export interface BloodRequestQuery {
    name?: string;
    phone?: string;
    bloodType?: string;
    bloodComponent?: string;
    status?: string;
    requestedBy?: string;
}
export interface BloodRequestInput {
    name: string;
    phone: string;
    bloodType: string;
    bloodComponent: string;
    status?: string;
    address: string;
    requestedBy: string;
}