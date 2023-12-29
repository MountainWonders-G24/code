// import { connectDB } from "@/configs/dbConfig";
// import { validateJWT } from "@/app/helpers/validateJWT";
// import { NextRequest, NextResponse } from "next/server";
// import User from "@/app/models/userModel";

// connectDB();
// export async function GET(request: NextRequest) {
//     try {
//         // const userId = await validateJWT(request);
//         // console.log(userId);
        
//         const user = await User.findOne(
//             {
//                 _id: '658c335409d3ed8ea82f26c3'
//             });
//         console.log(user);
//         return NextResponse.json({
//             data: user,
//         });
//     } catch (error: any) {
//             return NextResponse.json({
//                 message: error.message,
//                 status: 400
//             });
        
        
        
//     }
// }


import { NextRequest, NextResponse } from "next/server";
import Refuge from "@/app/models/refugeModel";
import User from "@/app/models/userModel";
import { validateJWT } from "@/app/helpers/validateJWT";
import { connectDB } from "@/configs/dbConfig";
import jwt from "jsonwebtoken";

connectDB();

export async function GET(request: NextRequest) {
    try {
        
        

        // if (!user.isAdmin) {
        //     return NextResponse.json({
        //         message: "Only admin can use this API!",
        //         status: 404
        //     });
        // }

        
        //const randomUser = await User.aggregate([{ $sample: { size: 1 } }]);
        //const user = randomUser[0]; 

        //const user = await User.findOne({ id: new ObjectId('658c345409d3ed8ea82f26c8'),});
        const email1 = await getCurrentEmail(request);
        const user1= await User.findOne({ email: email1,}).select("-password");


        const user = await User.findById("658c345409d3ed8ea82f26c8");
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

// async function getCurrentEmail(request: NextRequest) {
//     try {
//         const userId = await validateJWT(request);
//         // const user = await User.findById(userId).select("-password");

//         return userId;
//     } catch (error: any) {
//         return null;
//     }
// }

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
