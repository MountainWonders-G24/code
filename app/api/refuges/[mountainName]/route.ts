import { NextRequest, NextResponse } from "next/server";
import Refuge from "@/app/models/refugeModel";

interface Params {
    mountainId: string;
}

export async function GET(request: NextRequest, { params }: { params: Params }) {
    try {
        const mountainId = params.mountainId;

        const refuges = Refuge.find({
            mountainId: mountainId
        });

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