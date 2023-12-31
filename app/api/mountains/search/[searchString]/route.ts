
import Mountain from "@/app/models/mountainModel";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/configs/dbConfig";

interface Params {
    searchString: string;
}

connectDB();
export async function GET(request: NextRequest, { params }: { params: Params }) {
    try {
        const mountainName = params.searchString;
        const mountains = await Mountain.find({
            name: { $regex: mountainName, $options: "i" } // "i" case-insensitive
        });


        if (!mountains||mountains.length == 0) {
            throw new Error("No Mountain found");
        }
        return NextResponse.json({
            message: "Mountain retrieved!",
            data: mountains,
            status: 200
        })
    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
            status: 404
        });
    }

}