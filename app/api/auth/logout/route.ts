import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export function GET(){
    const response = NextResponse.json({
        message: "Logout successful",
        status: 200
    });
    const cookieStore = cookies();
    console.log(cookieStore);
    cookieStore.delete('email');
    cookieStore.delete('token');
    //response.cookies.delete("token");
    //response.cookies.delete("email");
    return response;
}