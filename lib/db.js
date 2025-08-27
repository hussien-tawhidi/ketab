import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    const { connection } = await mongoose.connect(
      process.env.MONGODB_URL
    );
    if (connection.readyState === 1) {
      console.log("MongoDB Connected");
      return Promise.resolve(true);
    }
  } catch (error) {
    console.error(error, "Error connecting to MongoDB");
    return Promise.reject(error);
  }
};
