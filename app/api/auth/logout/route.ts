import { NextResponse } from "next/server";
import { cookies } from "next/headers";


export async function GET()  {
    const cookieStore = cookies();
    console.log(cookieStore);
    cookieStore.delete('email');
    cookieStore.delete('token');
    //response.cookies.delete("token");
    //response.cookies.delete("email");
    return NextResponse.json({
        message: "Logout successful",
        status: 200
    });;
}