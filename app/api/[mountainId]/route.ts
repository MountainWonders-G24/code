import { NextRequest, NextResponse } from "next/server";
import Mountain from "@/app/models/mountainModel";
import User from "@/app/models/userModel";

interface Params {
    mountainId: string;
}

export async function POST(request: NextRequest, { params }: { params: Params }) {
    try {
        const mountainId = params.mountainId; 
        
        const mountain = await Mountain.findOne({
            id: mountainId
        });

        if (!mountain) {
            throw new Error("No mountain found")
        }

        return NextResponse.json({
            message: "Refuge added!",
            status: 201
        })
    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
            status: 404
        });
    }
}
