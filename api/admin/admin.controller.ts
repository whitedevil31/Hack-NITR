import { Company, Admin } from "./admin.schema";
import HttpError from "http-errors";
import mongoose from "mongoose";
import * as jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { adminDB, companyData } from "../../types/types";
import { UserOrder } from "../client/client.schema";
export const registerAdmin = async (adminData: adminDB) => {
  try {
    if (await Admin.findOne({ companyName: adminData.companyName })) {
      throw HttpError(409, "User already exists!");
    }
    const salt = await bcrypt.genSalt(12);

    const hashedPassword = await bcrypt.hash(adminData.password, salt);

    const newAdminData = {
      companyName: adminData.companyName,
      password: hashedPassword,
      email: adminData.email,
      phone: adminData.phone,
      address: adminData.address,
    };
    const admin = new Admin(newAdminData);
    console.log(admin);
    const response = await admin.save();
    console.log(response);
    return admin;
  } catch (err) {
    throw err;
  }
};

export const loginAdmin = async (email: string, password: string) => {
  try {
    const findAdmin = await Admin.findOne({
      email: email,
    });
    if (!findAdmin) {
      throw HttpError(
        401,
        "Email does not exist, please create a new account!"
      );
    }

    const correctPassword = await bcrypt.compare(password, findAdmin.password);

    if (!correctPassword) {
      throw HttpError(401, "Password Incorrect, please try again.");
    }
    const token = jwt.sign(
      {
        email: findAdmin.email,
        _id: findAdmin._id,
        category: "admin",
      },
      process.env.JWT_SECRET || "",
      { expiresIn: "10d" }
    );
    return token;
  } catch (err) {
    throw err;
  }
};

export const postCompanyDetails = async (
  companyData: companyData,
  id: mongoose.Schema.Types.ObjectId
) => {
  try {
    const findAdmin = await Admin.findOne({ _id: id });
    const postData = {
      adminId: id,
      adminRating: findAdmin.rating,
      fromAddress: companyData.fromAddress,
      toAddress: companyData.toAddress,
      date: companyData.date,
      price: companyData.price,
      expectedDelivery: companyData.expectedDelivery,
    };
    console.log(postData);
    const companyOrderData = new Company(postData);
    console.log(companyOrderData);
    const response = await companyOrderData.save();
    console.log(response);
    return response;
  } catch (err) {
    throw err;
  }
};

interface filterData {
  fromAddress: string;
  toAddress: string;
  date: Date;
  sortBy: string;
}
export const getFilterCompanyDetails = async (data: filterData) => {
  try {
    const filteredData = await Company.find({
      fromAddress: { $regex: `^${data.fromAddress}`, $options: "i" },
      toAddress: { $regex: `^${data.toAddress}`, $options: "i" },
    })
      .elemMatch("date", { $gte: data.date })
      .populate("adminId")
      .sort(data.sortBy);

    return filteredData;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getOrderDetails = async (id: mongoose.ObjectId) => {
  try {
    const companyOrders = await UserOrder.find({ adminId: id }).populate(
      "userId"
    );

    return companyOrders;
  } catch (error) {
    throw error;
  }
};
