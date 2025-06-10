export interface BloodRequestQuery {
    user?: string;
    bloodType?: string;
    bloodComponent?: string;
    status?: string;
    requestBy?: string;
}
export interface BloodRequestInput {
    user: string;
    bloodType: string;
    bloodComponent: string;
    status?: string;
    address: string;
    requestBy?: string;
}