import { message } from "antd";
import mongoose from "mongoose";
export const connectDB = async () => {
    try {
        let uri = "mongodb+srv://giorgiasaccon:<password>@cluster0.e3bpual.mongodb.net/";
        await mongoose.connect(uri);
        console.log("Mongo DB connected");
    } catch (error) {
        console.log("Errore URI:" + error);
    }
};

