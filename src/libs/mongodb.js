import mongoose from "mongoose";

const { MONGODB_URI } = process.env;
//console.log("MONGODB_URI", MONGODB_URI)

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI must be defined");
}

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(MONGODB_URI);
    // console.log("connection", connection)
    if (connection.readyState === 1) {
      console.log("MongoDB Connected");
      return Promise.resolve(true);
    }
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};