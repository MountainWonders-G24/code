import { NextRequest, NextResponse } from "next/server";
import Mountain from "@/app/models/mountainModel";
import Refuge from "@/app/models/refugeModel";
import User from "@/app/models/userModel";
import { connectDB } from "@/configs/dbConfig";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
interface Params {
    mountainId: string;
}
connectDB();
export async function POST(request: NextRequest, { params }: { params: Params }) {
    
    try {
        const cookieStore = cookies();
        let token = cookieStore.get('email');

        let cookieEmail;
        
        try {
            const jwtsecret= (process.env.jwt_secret!);
            
        
            if (!token) {
                return NextResponse.json({
                    message: "You need to log in to use this API!",
                    status: 401
                });
            }
            //const decryptedToken:any = jwt.verify(token.value, jwtsecret);
            const decoded :any  = jwt.verify(token.value, jwtsecret);
            
            cookieEmail = decoded.email;
        } catch (error: any) {
            throw error;
        }
       
        const user= await User.findOne({ email: cookieEmail,}).select("-password");
        if (user.isAdmin) {
            return NextResponse.json({
                message: "You need to be an User to use this API!",
                status: 403
            });
        }

        const mountainId = params.mountainId; 

        
        const mountain = await Mountain.findOne({
            id: mountainId
        });

        if (!mountain) {
            return NextResponse.json({
                message: "Mountain not found!",
                status: 404
            });
        }


        const reqBody = await request.json();
        
        const refuge = new Refuge(reqBody);
        refuge.relativeId = 0;
        const existingData = await Refuge.findOne({ 
            mountainId: mountainId,
            name: refuge.name,
            //image: refuge.image,
            //description: refuge.description,
        });

        if (existingData) {
            console.log("Data already exists in the database.");
            return NextResponse.json({
                message: "Data already exists in the database",
                status: 405
            }); // or handle the case appropriately
        }else{
            await refuge.save();
        }

        const refugeId = refuge._id;
        

        return NextResponse.json({
            message: "Refuge added!",
            data: refugeId,
            status: 201
        })
    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
            status: 404
        });
    }
}
