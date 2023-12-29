import { NextRequest, NextResponse } from "next/server";
import Refuge from "@/app/models/refugeModel";
import User from "@/app/models/userModel";
import { validateJWT } from "@/app/helpers/validateJWT";
import { connectDB } from "@/configs/dbConfig";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
connectDB();

export async function GET(request: NextRequest) {
    try {
        
      const cookieStore = cookies();
      console.log(cookieStore);
      let token = cookieStore.get('email');
      
        //const user = await User.findOne({ id: new ObjectId('658c345409d3ed8ea82f26c8'),});
        let email1;        
        let test;
        
        try {
          const jwtsecret= (process.env.jwt_secret!);
          
          if (!token) {
            throw new Error("No token found");
          }
          const decryptedToken:any = jwt.verify(token.value, jwtsecret);
          email1 = decryptedToken.email;
          
        } catch (error: any) {
          return NextResponse.json({
            message: error.message,
            data: test,
            status: 500, // or any appropriate status code
          });
        }
        console.log("email1");
        const user= await User.findOne({ email: email1,}).select("-password");


        //console.log(user);
        return NextResponse.json({
            message: "User presente!",
            data: user,
            status: 200,
        });
    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
            data: cookies().get('token'),
            status: 404
        });
    }
}



