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
        
        let email1;
        let token;
        let test;
        try {
          token = request.cookies.get('email')?.value || '';
          const jwtsecret= (process.env.jwt_secret!);
          test= jwtsecret;
          const decryptedToken: any = jwt.verify(token, "mountainwonders" );
          email1 = decryptedToken.email;
        } catch (error: any) {
          return NextResponse.json({
            message: error.message,
            data: test,
            status: 500, // or any appropriate status code
          });
        }
        console.log(email1);
        const user1= await User.findOne({ email: "admin@admin.mw",}).select("-password");


        //console.log(user);
        return NextResponse.json({
            message: "User presente!",
            data: user1,
            status: 200
        });
    } catch (error: any) {
        
        return NextResponse.json({
            message: error.message,
            status: 404
        });
    }
}



