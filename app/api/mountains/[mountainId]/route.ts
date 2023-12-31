import { NextRequest, NextResponse } from "next/server";
import Mountain from "@/app/models/mountainModel";
import { connectDB } from "@/configs/dbConfig";
import { message } from "antd";

interface Params {
    mountainId: string;
}
connectDB();
export async function GET(request: NextRequest, { params }: { params: Params }) {
    
    try {
        
        const mountainId = params.mountainId;
        const mountain = await Mountain.findOne({
            id: mountainId
        });
        
        
        if (mountain.length == 0) {
            throw new Error("No mountain found")
        }
        console.log("test3000000");
        return NextResponse.json({
            message: "Mountain retrieved!",
            data: mountain,
            status: 200
        });
    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({
            message: error.message,
            status: 404
        });
    }
}