import mongoose from "mongoose";
import {Decimal128} from "bson";

export const refugeSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: false,
        },
        name: {
            type: String,
            required: true,
        },
        avgRating: {
            type :mongoose.Types.Decimal128,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        // Reviews
        // Position
        mountainId: {
            type: Number
        }
    }
);

export default mongoose.models["Refuges"] || mongoose.model("Refuges", refugeSchema);