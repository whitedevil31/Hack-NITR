import { UserOrder } from "./client.schema";
import HttpError from "http-errors";
import { sendOrderConfirmationEmail, sendInvoiceEmail } from "../emails/account";
import { Company, Admin } from "../admin/admin.schema";
import { User } from "../auth/auth.schema";
import mongoose from "mongoose";
import { orderUpdate } from "./client.schema";
export const userOrderDetails = async (
  userOrderData: any,
  id: mongoose.Schema.Types.ObjectId
) => {
  try {
    const findAdmin = await Admin.findOne({
      _id: userOrderData.adminId,
    });
    const findUser = await User.findOne({
      _id: id,
    });
    const newUserOrderData = {
      adminId: findAdmin._id,
      userId: id,
      fromAddress: userOrderData.fromAddress,
      toAddress: userOrderData.toAddress,
      expectedDelivery: userOrderData.expectedDelivery,
      date: userOrderData.date,
      weight: userOrderData.weight,
      price: userOrderData.price,
      orderedOn: new Date(),
      paymentMode: userOrderData.paymentMode,
    };

    const email = await sendOrderConfirmationEmail(
      findUser.email,
      findUser.username,
      newUserOrderData.userId,
      newUserOrderData.fromAddress,
      newUserOrderData.toAddress,
      newUserOrderData.expectedDelivery
    );

    console.log(email);

    console.log(newUserOrderData);
    const data = new UserOrder(newUserOrderData);
    const response = await data.save();

    if (!response) {
      throw HttpError(500, "Internal Server Error!");
    }

    return response;
  } catch (err) {
    throw err;
  }
};

export const getOrderDetails = async (id: mongoose.Schema.Types.ObjectId) => {
  try {
    const userOrders = await UserOrder.find({
      userId: id,
    }).populate("adminId");
    // .populate("userId");

    return userOrders;
  } catch (error) {
    console.log(error);
  }
};
export const closeOrder = async (orderId: mongoose.Schema.Types.ObjectId) => {
  try {
    const closeOrder = await UserOrder.updateOne(
      { _id: orderId },
      { transactionOver: true }
    );
    return closeOrder;
  } catch (error) {
    throw error;
  }
};
export const postRating = async (
  id: mongoose.Schema.Types.ObjectId,
  rating: Number,
  adminId: mongoose.Schema.Types.ObjectId
) => {
  try {
    const checkOrderStatus = await UserOrder.findOne({
      _id: id,
      transactionOver: true,
    });
    const findOrder = await UserOrder.findOne({ _id: id, gaveRating: true });
    if (findOrder) {
      throw HttpError(400, "You cannot give rating");
    }
    if (!checkOrderStatus) {
      throw HttpError(400, "Order has not been processed fully");
    }
    const getAdmin = await Admin.findOne({ _id: adminId });
    console.log("getting admin");
    console.log(getAdmin);
    const previousRating = getAdmin.rating;
    console.log("rating from frontend" + rating);
    console.log(previousRating);
    //3
    let newRating = (parseInt(previousRating) + parseInt(rating)) / 2;
    console.log(newRating);

    if (previousRating == 0) {
      newRating = rating;
    }
    console.log(newRating);
    const updateNewRating = await Admin.findByIdAndUpdate(
      { _id: adminId },
      { rating: newRating },
      { new: true }
    );
    console.log(updateNewRating);
    const gaveRatingUpdate = await UserOrder.findByIdAndUpdate(
      { _id: id },
      { gaveRating: true, rating: rating },
      { new: true }
    );

    return updateNewRating;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const addUpdate = async (
  id: mongoose.Schema.Types.ObjectId,
  message: string
) => {
  try {
    const updateExist = await orderUpdate.findOne({ orderId: id });
    if (updateExist) {
      await orderUpdate.updateOne(
        { orderId: id },
        { $push: { update: { message, createdAt: Date.now() } } }
      );
    } else {
      const data = {
        orderId: id,
        update: [{ message, createdAt: Date.now() }],
      };
      const firstUpdate = new orderUpdate(data);
      await firstUpdate.save();
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};


export const sendInvoice = async (id: mongoose.Schema.Types.ObjectId) => {
  try {
    const findOrder = await UserOrder.findOne({

      _id: id
    }).populate("userId")



    const invoice = await sendInvoiceEmail(
      findOrder.userId.username,
      findOrder.userId.email,
      id,
      findOrder.fromAddress,
      findOrder.toAddress,
      findOrder.date,
      findOrder.weight,
      findOrder.price,
      findOrder.orderedOn,
      findOrder.paymentMode
    )
  } catch (error) {
    throw error
  }

}



export const getUpdate = async (id: mongoose.Schema.Types.ObjectId) => {
  try {
    const findUpdate = await orderUpdate.findOne({ orderId: id });
    if (!findUpdate) {
      throw HttpError(404, "Order not found!");
    }
    return findUpdate;
  } catch (err) {
    console.log(err);
    throw err;
  }
};