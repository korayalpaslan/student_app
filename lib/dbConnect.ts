import mongoose from "mongoose";

const MONGODB_URI: any = process.env.MONGODB_URI;
export const dbConnect = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
};
