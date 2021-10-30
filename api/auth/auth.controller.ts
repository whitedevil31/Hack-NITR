import { User } from "./auth.schema";
import HttpError from "http-errors";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import * as jwt from "jsonwebtoken";
import { userDB } from "../../types/types";

export const registerUser = async (userData: userDB) => {
  try {
    if (await User.findOne({ email: userData.email })) {
      throw HttpError(409, "User already exists!");
    }
    const salt = await bcrypt.genSalt(12);

    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const newUserData = {
      username: userData.username,
      password: hashedPassword,
      email: userData.email,
      phone: userData.phone,
    };


    const user = new User(newUserData);

    const response = await user.save();


    const token = jwt.sign(
      {
        email: newUserData.email,
        _id: response._id,
        category: "client",
      },
      process.env.JWT_SECRET || "",
      { expiresIn: "10d" }
    );
    if (!response) {
      throw HttpError(500, "Internal Server Error!");
    }

    return {
      success: true,
      token,
    };
  } catch (err) {
    throw err;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {

    const findUser = await User.findOne({
      email: email,
    });

    if (!findUser) {

      throw HttpError(
        401,
        "Email does not exist, please create a new account!"
      );
    }


    console.log(findUser.password);
    const correctPassword = await bcrypt.compare(password, findUser.password);
    console.log(correctPassword);

    if (!correctPassword) {
      throw HttpError(401, "Password Incorrect, please try again.");
    }
    const token = jwt.sign(
      {
        email: findUser.email,
        _id: findUser._id,
        category: "client",
      },
      process.env.JWT_SECRET || "",
      { expiresIn: "10d" }
    );
    return {
      result: findUser,
      token,
    };
  } catch (err) {
    throw err;
  }
};
