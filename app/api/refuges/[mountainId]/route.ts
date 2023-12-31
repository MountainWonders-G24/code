import { NextRequest, NextResponse } from "next/server";
import Refuge from "@/app/models/refugeModel";
import { connectDB } from "@/configs/dbConfig";
import axios from "axios";

interface Params {
    mountainId: string;
}
connectDB();
export async function GET(requestdf: NextRequest, { params }: { params: Params }) {
    
    try {
        
        const mountainId = params.mountainId;
        let refuges;
        console.log("mountainId: " + mountainId);
        if (mountainId=="0") {
        
            refuges= await Refuge.find({
                __v: mountainId
            });
        }else{
            const mountain = await (axios.get('https://mountainwonders-fawn.vercel.app/api/mountains/'+mountainId));
            console.log(mountain);
            if (mountain.data.status == 404) {
                throw new Error("No mountain found")
            }
            refuges= await Refuge.find({
                mountainId: mountainId
            });
        }

        if (!refuges) {
            throw new Error("No refuges found")
        }
        
        return NextResponse.json({
            message: "Refuges retrieved!",
            data: refuges,
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