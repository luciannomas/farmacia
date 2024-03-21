import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
    },
    fullname: {
      type: String,
      required: [true, "fullname is required"],
      trim: true,
      minLength: [3, "fullname must be at least 3 characters"],
      maxLength: [20, "fullname must be at most 20 characters"],
    },
    resetToken: {
      type: String,
      trim: true,
    },
    resetTokenExpiry: {
      type: Date,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.User || model("User", UserSchema);