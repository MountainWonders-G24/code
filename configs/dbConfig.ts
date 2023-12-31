import { message } from "antd";
import mongoose from "mongoose";
export const connectDB = async () => {
    let uri = process.env.ATLAS_URI || "";
    try {
        await mongoose.connect(uri);
        console.log("Mongo DB connected");
    } catch (error) {
        console.log("Errore URI:" + error);
    }
};



export const disconnectDB = async () => {
    try {
      await mongoose.disconnect();
      console.log("Mongo DB disconnected");
    } catch (error) {
      console.log("Error disconnecting from MongoDB:", error);
    }
};