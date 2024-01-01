
import Refuge from "@/app/models/refugeModel";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/configs/dbConfig";
import axios from "axios";
interface Params {
    mountainId: string;
    searchString: string;
}

connectDB();
export async function GET(request: NextRequest, { params }: { params: Params }) {
    try {
        
        console.log(params);
        console.log(params.mountainId);
        const refugeName = params.searchString;
        console.log("Refuge name: " + refugeName);
        let refuges;
        if (params.mountainId != "0") {
            const mountain = await (axios.get('https://mountain-wonders.vercel.app/api/mountains/'+params.mountainId));
            console.log(mountain);
            if (mountain.data.status == 404) {
                throw new Error("No mountain found")
            }
            refuges = await Refuge.find({
                name: { $regex: refugeName, $options: "i" },
                mountainId:  params.mountainId// "i" case-insensitive
            });
        }else{
            refuges = await Refuge.find({
                name: { $regex: refugeName, $options: "i" }
            });
        }
        
        

        // const refuges = await Refuge.find({
        //     name: reqBody.name
        // });

        if (!refuges || (refuges.length == 0)) {
            throw new Error("No refuges found")
        }
        console.log(refuges);

        return NextResponse.json({
            message: "Refuges retrieved!",
            data: refuges,
            status: 200
        })
    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
            status: 404
        });
    }

}