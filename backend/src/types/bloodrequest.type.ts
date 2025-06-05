export interface BloodRequestQuery {
    userId?: string;
    bloodType?: string;
    bloodComponent?: string;
    status?: string;
}
export interface BloodRequestInput {
    userId: string;
    bloodType: string;
    bloodComponent: string;
    status?: string;
    address: string;
}