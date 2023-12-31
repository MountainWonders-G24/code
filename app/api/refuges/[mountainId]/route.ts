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
    try {
        test= "test1";
        test= params.mountainId;
        const id = params.mountainId;
        let refuges;
        if (id=="0") {
            test= "test1";
            refuges= await Refuge.find({
                __v: id
            });
        }else{
            test = "test2";
            const mountain = await axios.get('/api/mountains/'+id);
            if (mountain.data.status == 404) {
                //restituire 405
                throw new Error("No mountain found");
            }
            refuges= await Refuge.find({
                mountainId: id
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