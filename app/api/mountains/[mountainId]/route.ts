import { NextRequest, NextResponse } from "next/server";
import Mountain from "@/app/models/mountainModel";
import { connectDB } from "@/configs/dbConfig";

interface Params {
    mountainId: string;
}
connectDB();
export async function GET(request: NextRequest, { params }: { params: Params }) {
    let test;
    try {
        test = "test0";
        const mountainId = params.mountainId;
        test = "test1";
        const mountain = await Mountain.findOne({
            id: mountainId
        });
        
        test = "test2";
        if (!mountain) {
            throw new Error("No mountain found")
        }
        test = "test3";
        return NextResponse.json({
            message: "Mountain retrieved!",
            data: mountain,
            status: 200
        });
    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({
            message: test,
            status: 404
        });
    }
}