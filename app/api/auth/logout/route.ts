import { NextResponse } from "next/server";

export function GET(){
    const response = NextResponse.json({
        message: "Logout successful",
        status: 200
    });

    response.cookies.delete("token");
    response.cookies.delete("email");
    return response;
}