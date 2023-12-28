import { connectDB, disconnectDB} from "@/configs/dbConfig";
import { validateJWT } from "@/app/helpers/validateJWT";
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/userModel";

//connectDB();
export async function GET(request: NextRequest) {
    try {
        const userId = await validateJWT(request);

        //const user = await User.findById(userId).select("-password");
        const userExists = await User.findOne({
            id: userId
        });
        
        if (userExists) {
            throw new Error("User already exists")
        }
        return NextResponse.json({
            data: userExists,
        });
    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
            status: 400
        });
    }
}