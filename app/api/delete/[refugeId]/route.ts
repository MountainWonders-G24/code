import { NextRequest, NextResponse } from "next/server";
import Refuge from "@/app/models/refugeModel";
import User from "@/app/models/userModel";
import { validateJWT } from "@/app/helpers/validateJWT";

interface Params {
    refugeId: string;
}

export async function DELETE(request: NextRequest, { params }: { params: Params }) {
    try {
        const user = await getCurrentUser(request);
        if (!user) {
            return NextResponse.json({
                message: "You need to login to use this API!",
                status: 401
            })
        }

        if (user.name != 'admin') {
            return NextResponse.json({
                message: "Only admin can use this API!",
                status: 404
            })
        }

        const refugeId = params.refugeId;

        const refuge = Refuge.findOneAndDelete({
            id: refugeId
        });

        if (!refuge) {
            throw new Error("No refuge found")
        }

        return NextResponse.json({
            message: "Refuge deleted!",
            status: 200
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
        const user = await User.findById(userId).select("-password");

        return user;
      } catch (error: any) {
        return null;
      }
}