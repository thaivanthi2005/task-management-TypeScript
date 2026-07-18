import mongoose from "mongoose";

export const connect = async (): Promise<void> => {
  try {
    const URL = process.env.MONGO_URL;

    if (!URL) {
      throw new Error("MONGO_URL is not defined in .env");
    }

    await mongoose.connect(URL);
    console.log("CONNECT SUCCESS");
  } catch (error) {
    console.log("CONNECT ERROR", error);
  }
};
