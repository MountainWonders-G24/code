import { NextRequest, NextResponse } from "next/server";
import Mountain from "@/app/models/mountainModel";
import Refuge from "@/app/models/refugeModel";
import User from "@/app/models/userModel";
import { validateJWT } from "@/app/helpers/validateJWT";
import { connectDB } from "@/configs/dbConfig";
interface Params {
    mountainId: string;
}
//connectDB();
export async function POST(request: NextRequest, { params }: { params: Params }) {
    try { 
        const user = await getCurrentUser(request);
        if (!user) {
            return NextResponse.json({
                message: "You need to login to use this API!",
                status: 401
            })
        }

        const mountainId = params.mountainId; 
        console.log(mountainId);
        const mountain = await Mountain.findOne({
            id: mountainId
        });

        if (!mountain) {
            throw new Error("No mountain found")
        }


        const reqBody = await request.json();
        
        const refuge = new Refuge(reqBody);

        const existingData = await Refuge.findOne({ 
            mountainId: mountainId,
            name: refuge.name,
            image: refuge.image,
            description: refuge.description,
         });

        if (existingData) {
            console.log("Data already exists in the database.");
            return NextResponse.json({
                message: "existingData",
                status: 405
            })
             ; // or handle the case appropriately
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

async function getCurrentUser(request: NextRequest) {
    try {
        const userId = await validateJWT(request);
        // const user = await User.findById(userId).select("-password");

        return userId;
    } catch (error: any) {
        return null;
    }
}