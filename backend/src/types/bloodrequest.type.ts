export interface BloodRequestQuery {
    user?: string;
    bloodType?: string;
    bloodComponent?: string;
    status?: string;
}
export interface BloodRequestInput {
    user: string;
    bloodType: string;
    bloodComponent: string;
    status?: string;
    address: string;
}