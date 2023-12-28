import { NextRequest, NextResponse } from "next/server";
import Mountain from "@/app/models/mountainModel";
import { connectDB } from "@/configs/dbConfig";

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
        
        if (!mountain) {
            throw new Error("No mountain found")
        }
       
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