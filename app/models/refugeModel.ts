import mongoose from "mongoose";
import {Decimal128} from "bson";

export const refugeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        avgRating: {
            type : Number,
            required: false,
        },
        description: {
            type: String,
            required: true,
        },
        // Reviews
        // Position
        mountainId: {
            type: Number,
            required: false,
        },
        image: {
            type: String,
            required: true,
        },
        __v: {
            type: Number,
            default: 0,
            required: false,
        },
    }
);

export default mongoose.models["Refuges"] || mongoose.model("Refuges", refugeSchema);