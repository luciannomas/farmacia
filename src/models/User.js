import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      trim: true
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true
    },
    fullname: {
      type: String,
      required: [true, "fullname is required"],
      trim: true
    },
    resetToken: {
      type: String,
      trim: true
    },
    resetTokenExpiry: {
      type: Date
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.User || model("User", UserSchema);
