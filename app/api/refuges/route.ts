import Refuge from "@/app/models/refugeModel";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/configs/dbConfig";

connectDB();
export async function GET() {
    try {
        const refuges = await Refuge.find();
        if (refuges.length === 0) {
            return NextResponse.json({
                message: "No refuges!",
                data: [],
                status: 200
            })
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