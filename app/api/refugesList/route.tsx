import { NextRequest, NextResponse } from "next/server";
import Refuge from "@/app/models/refugeModel";
import { connectDB } from "@/configs/dbConfig";


connectDB();
export async function GET(request: NextRequest) {
    try {
        
        const refuges = await Refuge.find({});
        
        
        if (!refuges) {
            throw new Error("No refuges found")
        }
       
        return NextResponse.json({
            message: "Refuges retrieved!",
            data: refuges,
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