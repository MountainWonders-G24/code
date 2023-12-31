import { NextRequest, NextResponse } from "next/server";
import Refuge from "@/app/models/refugeModel";
import { connectDB } from "@/configs/dbConfig";
import axios from "axios";

interface Params {
    mountainId: string;
}
connectDB();
export async function GET(request: NextRequest, { params }: { params: Params }) {
    let test= "test0";
    test = "ciao";
    try {
        test =
        test= "test1";
        test= params.mountainId;
        const mountainId = params.mountainId;
        let refuges;
        if (mountainId=="0") {
            test= "test1";
            refuges= await Refuge.find({
                __v: mountainId
            });
        }else{
            test = "test2";
            const mountain = await axios.get('/api/mountains/3');

            if (mountain.data.status == 404) {
                //restituire 405
                throw new Error("No mountain found");
            }
            test = "test3";
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
            data: test,
            status: 404
        });
    }
}