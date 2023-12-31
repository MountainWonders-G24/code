
import Mountain from "@/app/models/mountainModel";
import { NextResponse } from "next/server";
import { connectDB } from "@/configs/dbConfig";

connectDB();
export async function GET() {
    try {
        const mountains = await Mountain.find({});

        return NextResponse.json({
            message: "Mountains retrieved!",
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