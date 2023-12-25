import mongoose from "mongoose";
import {Double, Int32} from "bson";

export const refugeSchema = new mongoose.Schema(
    {
        id: {
            type: Int32,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        avgRating: {
            type: Double,
            required: true,
        },
        // Reviews
        // Position
        mountainId: {
            type: Int32
        }
    }
);

export default mongoose.models["Refuges"] || mongoose.model("Refuges", refugeSchema);