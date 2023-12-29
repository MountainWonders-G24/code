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
      let token = cookieStore.get('token');
      
        //const user = await User.findOne({ id: new ObjectId('658c345409d3ed8ea82f26c8'),});
        let email1;
        
        let test;

        
        // try {
          

        //   console.log("Token: --- " + token);
        //   let token2 = request.cookies.getAll();

        //   console.log("Token2: --- ");
        //   for (let [key, value] of Object.entries(token2)) {
        //     console.log(`${key}: ${value.name}`);
        //   }
        //   test=token2;
        //   const jwtsecret= (process.env.jwt_secret!);
        //   test= token2;
          
        //   const decryptedToken:any = jwt.verify(token, jwtsecret);
        //   email1 = decryptedToken.email;
          
        // } catch (error: any) {
        //   return NextResponse.json({
        //     message: error.message,
        //     data: test,
        //     status: 500, // or any appropriate status code
        //   });
        // }
        console.log("email1");
        // const user1= await User.findOne({ email: "admin@admin.mw",}).select("-password");


        //console.log(user);
        return NextResponse.json({
            message: "User presente!",
            data: token?.name,
            status: 500
        });
    } catch (error: any) {
        
        return NextResponse.json({
            message: error.message,
            data: cookies().get('token'),
            status: 404
        });
    }
}



