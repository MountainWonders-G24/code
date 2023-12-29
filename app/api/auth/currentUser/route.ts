import { NextRequest, NextResponse } from "next/server";
import Refuge from "@/app/models/refugeModel";
import User from "@/app/models/userModel";
import { validateJWT } from "@/app/helpers/validateJWT";
import { connectDB } from "@/configs/dbConfig";
import jwt from "jsonwebtoken";

connectDB();

export async function GET(request: NextRequest) {
    try {
        
        

        //const user = await User.findOne({ id: new ObjectId('658c345409d3ed8ea82f26c8'),});
        const email1 = await getCurrentEmail(request);
        const user1= await User.findOne({ email: email1,}).select("-password");


        //console.log(user);
        
        	
        return NextResponse.json({
            message: "User presente!",
            data: user1,
            status: 200
        });
    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({
            message: error.message,
            status: 404
        });
    }
}


export const getCurrentEmail = async (request: NextRequest) => {
    try {
      const token = request.cookies.get("email")?.value || "";
      if (!token) {
        throw new Error("No email provided");
      }
      const decryptedToken: any = jwt.verify(token, process.env.jwt_secret!);
      return decryptedToken.email;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
