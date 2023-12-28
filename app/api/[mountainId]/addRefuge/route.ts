import { NextRequest, NextResponse } from "next/server";
import Mountain from "@/app/models/mountainModel";
import Refuge from "@/app/models/refugeModel";
import User from "@/app/models/userModel";
import { validateJWT } from "@/app/helpers/validateJWT";
import { connectDB } from "@/configs/dbConfig";
interface Params {
    mountainId: string;
}
connectDB();
export async function POST(request: NextRequest, { params }: { params: Params }) {
    try { 
        const user = await getCurrentUser(request);
        if (!user) {
            return NextResponse.json({
                message: "You need to login to use this API!",
                status: 401
            })
        }

        const mountainId = params.mountainId; 
        
        const mountain = await Mountain.findOne({
            id: mountainId
        });

        if (!mountain) {
            throw new Error("No mountain found")
        }

        const reqBody = await request.json();

        const refuge = new Refuge(reqBody);
        await refuge.save();

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

async function getCurrentUser(request: NextRequest) {
    try {
        const userId = await validateJWT(request);
        const user = await User.findById(userId).select("-password");

        return user;
    } catch (error: any) {
        return null;
    }
}