import cookieParser from "cookie-parser";
import "dotenv/config";
import express from "express";
import logger from "morgan";
import path from "path";
import db from "./database/db";

// Router
import blogRouter from "./routes/blogs.route";
import categoryRouter from "./routes/category.route";
import donationEventRouter from "./routes/donationevent.route";
import participationRouter from "./routes/participation.route";
// DB initialize
db();

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/blogs", blogRouter);
app.use("/categories", categoryRouter);
app.use("/donationevents", donationEventRouter);
app.use("/participations", participationRouter);
app.listen(process.env.PORT || 3000, () => {
  console.log(`App listening on port ${process.env.PORT || 3000}`);
});

export default app;
