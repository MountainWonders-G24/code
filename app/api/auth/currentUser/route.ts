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
        var email1: string;
<<<<<<< HEAD
        if (!request.cookies.get('email')) {
          throw new Error('No email provided');
        }
        const email = request.cookies.get('email')?.value as string;
        
        const decryptedToken: any = jwt.verify(email, process.env.jwt_secret!);
        email1= decryptedToken.email;
=======
        try {
          const email = request.cookies.get('email')?.value || '';
          if (!email) {
            throw new Error('No email provided');
          }
          const decryptedToken: any = jwt.verify(email, process.env.jwt_secret!);
          email1= decryptedToken.email;
        } catch (error: any) {
          return NextResponse.json({
            message: error.message,
            status: 404
          });
        }
>>>>>>> 5f0bdae7f311fe23da44cecd93b1e8d95617b9e6
        console.log(email1);
        const user1= await User.findOne({ email: email1,}).select("-password");


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



