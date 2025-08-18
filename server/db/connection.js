import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const MONGO_URL = process.env.MONGO_URL;
    await mongoose.connect(MONGO_URL);
    console.log("Mongodb connected");
  } catch (error) {
    console.log("mongodb not connected");
    process.exit(1);
  }
};

export default connectDb;
