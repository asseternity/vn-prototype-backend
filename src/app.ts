// dependencies
import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import path from "node:path";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const app = express();

// cors
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

// settings
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// mount routes
import storyRoute from "./routes/storyRoute";
import usersRoute from "./routes/usersRoute";

app.use("/story", storyRoute);
app.use("/users", usersRoute);

// launch
const port = Number(process.env.PORT) || 3000;
app.listen(port, "0.0.0.0", () => {
  console.log(`App is listening on port ${port}!`);
});
