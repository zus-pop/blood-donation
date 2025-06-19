import myAxios from "../lib/custom-axios";

export interface BloodType {
  _id: string;
  bloodType: string;
  compatibility: {
    rbc?: { donateTo: BloodType[]; receiveFrom: BloodType[] };
    plasma?: { donateTo: BloodType[]; receiveFrom: BloodType[] };
    platelets?: { donateTo: BloodType[]; receiveFrom: BloodType[] };
    whole_blood?: { donateTo: BloodType[]; receiveFrom: BloodType[] };
  };
}

export async function getBloodTypes() {
  const res = await myAxios.get("/bloods");
  return res.data as BloodType[];
}