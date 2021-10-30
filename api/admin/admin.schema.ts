import mongoose from "mongoose";

export const adminSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
  address: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
  },
  rating: { type: Number, default: 0 },
});
export const Admin = mongoose.model("admin", adminSchema);
export const companySchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin",
  },
  fromAddress: {
    type: String,

    required: true,
    trim: true,
  },
  toAddress: {
    type: String,
    trim: true,
    required: true,
  },
  date: {
    type: Array,
    required: true,
    trim: true,
  },

  price: {
    type: Number,
    required: true,
  },
  // companyRating: { type: Number },
  expectedDelivery: { type: String },
});

export const Company = mongoose.model("company", companySchema);
