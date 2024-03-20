import { Schema, model, models } from "mongoose";

const SessionSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required "],
      unique: true,
      trim: true,
      maxlength: [40, "title cannot be grater than 40 characters"],
    },
    password: {
        type: String,
        required: [true, "The property 'password' is required "],
        trim: true,
      },
    fullname: {
      type: String,
      required: [true, "The property 'fullname' is required "],
      trim: true
    },
    
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Session || model("Session", SessionSchema);
