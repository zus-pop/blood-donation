import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import logger from "morgan";
import connect from "./database/db";
// Router
import authRouter from "./routes/auth.route";
import blogRouter from "./routes/blogs.route";
import bloodRouter from "./routes/blood.route";
import bloodRequestRouter from "./routes/bloodrequest.route";
import categoryRouter from "./routes/category.route";
import donationEventRouter from "./routes/donationevent.route";
import inventoryRouter from "./routes/inventory.route";
import onsiteCheckRouter from "./routes/onsitecheck.route";
import participationRouter from "./routes/participation.route";
import userRouter from "./routes/user.route";

// DB initialize
connect();

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/blogs", blogRouter);
app.use("/categories", categoryRouter);
app.use("/donationevents", donationEventRouter);
app.use("/participations", participationRouter);
app.use("/users", userRouter);
app.use("/bloodrequests", bloodRequestRouter);
app.use("/onsitechecks", onsiteCheckRouter);
app.use("/bloods", bloodRouter);
app.use("/inventory", inventoryRouter);
app.use("/auth", authRouter);

app.listen(process.env.PORT ?? 3000, () => {
  console.log(`App listening on port ${process.env.PORT || 3000}`);
});

export default app;
