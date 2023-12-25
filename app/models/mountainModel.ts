import mongoose from "mongoose";

export const mountainSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        refuges: {
            type: Array,
            required: false
        }
    }
);

export default mongoose.models["Mountains"] || mongoose.model("Mountains", mountainSchema);