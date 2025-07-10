import myAxios from "../lib/custom-axios";

interface AuthProps {
  _id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  password?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const loginUser = async (
  data: Pick<AuthProps, "email" | "password">
): Promise<{ access_token: string }> => {
  const res = await myAxios.post("/auth/login", data);
  return res.data;
};

export const getProfile = async (): Promise<AuthProps> => {
  const res = await myAxios.get("/auth/profile");
  console.log(res);
  return res.data;
};

export const registerUser = async (
  data: Omit<AuthProps, "_id">
): Promise<AuthProps> => {
  const res = await myAxios.post("/auth/register", data);
  return res.data;
};
