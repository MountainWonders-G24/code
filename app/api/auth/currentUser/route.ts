import { connectDB } from "@/configs/dbConfig";
import { validateJWT } from "@/app/helpers/validateJWT";
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/userModel";

connectDB();
export async function GET(request: NextRequest) {
    try {
        const userId = await validateJWT(request);
        console.log("User id: " + userId);
        const user = await User.findById(userId).select("-password");
        console.log("Entrato nel try di current user");
        return NextResponse.json({
            data: user,
        });
    } catch (error: any) {
        console.log("Errore nel get di current user");
        return NextResponse.json({
            message: error.message,
            status: 400
        });
    }
}