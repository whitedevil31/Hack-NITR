import mongoose from "mongoose";
const userOrderSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin",
  },

  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  fromAddress: {
    type: String,
    required: true,
    trim: true,
  },
  toAddress: {
    type: String,
    required: true,
    trim: true,
  },
  date: { type: Date, required: true },
  weight: {
    type: Number,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
  orderedOn: { type: Date },
  paymentMode: { type: String },
  transactionOver: { type: Boolean, default: false },
  gaveRating: { type: Boolean, default: false },
  rating: { type: number, default: 0 },
  expectedDelivery: { type: String },
});

export const UserOrder = mongoose.model("userOrder", userOrderSchema);
const updateOrderSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "userOrder" },
  update: [
    {
      message: { type: String },
      createdAt: { type: Date },
    },
  ],
});
export const orderUpdate = mongoose.model("orderUpdate", updateOrderSchema);
