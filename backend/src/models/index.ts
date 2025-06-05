import { model } from "mongoose";
import { BlogSchema } from "./blog.schema";
import { CategorySchema } from "./category.schema";
import { DonationEventSchema } from "./donationevent.schema";
import { ParticipationSchema } from "./participation.schema";

export const Category = model("Category", CategorySchema);
export const Blog = model("Blog", BlogSchema);
export const DonationEvent = model("DonationEvent", DonationEventSchema);
export const Participation = model("Participation", ParticipationSchema);
