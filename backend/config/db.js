import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENV_VARS.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 50000,
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 50000,
      autoIndex: false,
      family: 4,
    });
    console.log("MongoDB Connected:" + conn.connection.host);
  } catch (error) {
    console.error("Error connecting to MONGODB:" + error.message);
    process.exit(1);
  }
};
