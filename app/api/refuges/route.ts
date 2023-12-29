import Refuge from "@/app/models/refugeModel";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/configs/dbConfig";

connectDB();
export async function GET() {
    try {
        let refuges= new Array();
        for (let i = 1; i < 4; i++) {
            const result= ( await Refuge.find({
                mountainId: i
            }));
            result.forEach(element => {
                refuges.push(element);
            });
        }
        console.log(refuges);


        
        //const refuges = await Refuge.find({});
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