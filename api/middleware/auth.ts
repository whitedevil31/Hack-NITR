import * as jwt from "jsonwebtoken";
import * as mongodb from "mongodb";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import HttpError from "http-errors";
dotenv.config({ path: "./.env" });
import { Company, Admin } from "../admin/admin.schema";
import { User } from "../auth/auth.schema";
import { adminSchema } from "../admin/admin.schema";
import { userSchema } from "../auth/auth.schema";
//import { connectDB } from "./db/db.connect";

declare module "jsonwebtoken" {
  export interface UserIDJwtPayload extends jwt.JwtPayload {
    email: string;
    _id: string;
  }
}

export const verifiedAdmin = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw HttpError(400, "not authorized");
    }

    const authToken = authorization.split(" ")[1];
    let payload;
    try {
      payload = <jwt.UserIDJwtPayload>(
        jwt.verify(authToken, process.env.JWT_SECRET || "")
      );
    } catch (err) {
      console.log("err in middleware");
      console.log(err);
      next(err);
    }
    let user;

    if (payload) {
      if (payload.category == "client") {
        user = await User.findOne({ email: payload.email });
      } else {
        user = await Admin.findOne({ email: payload.email });
      }
    }
    console.log(user);
    res.locals.user = { user };
    next();
  } catch (err) {
    next(err);
  }
};
