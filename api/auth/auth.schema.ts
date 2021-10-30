import mongoose from "mongoose";

// const userSchema = yup.object({
//   username: yup.string().trim().required().lowercase(),
//   email: yup.string().email().required(),
//   password: yup.string().trim().required(),
//   phone: yup.number().required(),
// });

export const userSchema = new mongoose.Schema({
  username: {
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
  phone: {
    type: Number,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
  },
});


export const User = mongoose.model("users", userSchema);
