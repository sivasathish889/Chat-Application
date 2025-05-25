import mongoose from "mongoose";


const dbConnection = async () => {
  try {
    await  mongoose.connect("mongodb://localhost:27017/chat-application").then(() => {
      console.log("MongoDB connected successfully");
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
};
export default dbConnection;
