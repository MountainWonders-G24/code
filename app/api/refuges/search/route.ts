
import Refuge from "@/app/models/refugeModel";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/configs/dbConfig";

connectDB();
export async function GET(request: NextRequest) {
    try {
        const reqBody = await request.json();

        const refuges = await Refuge.findOne({
            name: reqBody.name
        });

        // TODO: Filters

        if (!refuges) {
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