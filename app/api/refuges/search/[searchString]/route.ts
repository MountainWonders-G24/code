
import Refuge from "@/app/models/refugeModel";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/configs/dbConfig";

interface Params {
    searchString: string;
}

connectDB();
export async function GET(request: NextRequest, { params }: { params: Params }) {
    try {
        const refugeName = params.searchString;


        const refuges = await Refuge.find({
            name: { $regex: refugeName, $options: "i" } // "i" case-insensitive
        });


        if (!refuges||refuges.length == 0) {
            throw new Error("No refuges found")
        }
        
        
        return NextResponse.json({
            message: "Refuges retrieved!",
            data: refuges,
            status: 200
        })
    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
            status: 404
        });
    }

}