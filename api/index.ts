import { connectDB } from "./db/db.connect";
import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { HttpError } from "http-errors";
dotenv.config({ path: "./.env" });
connectDB();

import authRoute from "./auth/auth.router";
import adminRoute from "./admin/admin.router";
const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use("/", (req, res) => {
  res.json({ success: true, message: "Namma lost maara !" });
});
app.use(authRoute);
app.use(adminRoute);
app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    res.status(error.status).json({ message: error.message });
  }
});
// app.use("*", (req: Request, res: Response) => {
//   res.status(404).json({ message: "Resource not found" });
// });
app.listen(port, () => {
  console.log(`🎉🎉 - Wakey Wakey, your Server is up and running at ${port}!`);
});
