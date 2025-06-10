import myAxios from "../lib/custom-axios";
export async function getBloodTypes() {
  const res = await myAxios.get("/blood");
  return res.data; // should be [{ _id, bloodType }, ...]
}