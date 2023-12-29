import { connectDB } from "@/configs/dbConfig";
import { validateJWT } from "@/app/helpers/validateJWT";
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/userModel";

connectDB();
export async function GET(request: NextRequest) {
    try {
        // const userId = await validateJWT(request);
        // console.log(userId);
        
        
        const user = await User.findById("658b3e071e492a5f3abb8416").select("-password");
        console.log(user);
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