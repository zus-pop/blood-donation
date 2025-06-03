import mongoose from "mongoose";
const uri = process.env.MONGODB_URL as string;

export default async function connect() {
  await mongoose
    .connect(uri)
    .then(() => console.log("Connected"))
    .catch((err) => console.error(err));
}
