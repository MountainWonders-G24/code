import { NextRequest, NextResponse } from "next/server";
import Refuge from "@/app/models/refugeModel";
import User from "@/app/models/userModel";
import { validateJWT } from "@/app/helpers/validateJWT";
import { connectDB } from "@/configs/dbConfig";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

connectDB();
interface Params {
    refugeId: string;
}

export async function DELETE(request: NextRequest, { params }: { params: Params }) {
    try {
        
        console.log("DELETE refuge API called");
        const cookieStore = cookies();
        let token = cookieStore.get('email');
        let cookieEmail;
        
        try {
            const jwtsecret= (process.env.jwt_secret!);
            if (!token) {
                return NextResponse.json({
                    message: "You need to be an Admin to use this API!",
                    status: 401
                });
            }
            const decryptedToken:any = jwt.verify(token.value, jwtsecret);
            cookieEmail = decryptedToken.email;
            
        } catch (error: any) {
            throw error;
        }
        
        const user= await User.findOne({ email: cookieEmail,}).select("-password");
        if (!user.isAdmin) {
            return NextResponse.json({
                message: "You need to be an Admin to use this API!",
                status: 401
            });
        }
        const refugeId = params.refugeId;

            const refuge = await Refuge.findOneAndDelete({
                _id: refugeId
            });
    
            if (!refuge) {
                return NextResponse.json({
                    message: "Refuge not found",
                    status: 404,
                });
            }
    
            return NextResponse.json({
                message: "Refuge deleted!",
                status: 200
            });

    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
            status: error.status||500,
        });
    }
    
    
    
}

