import { connectDB } from "@/configs/dbConfig";
import { validateJWT } from "@/app/helpers/validateJWT";
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/userModel";

connectDB();
export async function GET(request: NextRequest) {
    try {
        console.log("Entered in get current user");
        const userId = await validateJWT(request);
        console.log(userId);
        const user = await User.findById(userId).select("-password");

        return NextResponse.json({
            data: user,
        });
    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
            status: 400
        });
    }
}