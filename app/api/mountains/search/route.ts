
import Mountain from "@/app/models/mountainModel";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/configs/dbConfig";

connectDB();
export async function GET(request: NextRequest) {
    try {
        const reqBody = await request.json();

        const mountains = await Mountain.findOne({
            name: reqBody.name
        });

        // TODO: Filters

        if (!mountains) {
            throw new Error("No mountains found")
        }

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