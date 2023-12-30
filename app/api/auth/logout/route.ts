import { NextResponse } from "next/server";
import { cookies } from "next/headers";


export async function GET()  {
    const cookieStore = cookies();
    cookieStore.delete('email');
    cookieStore.delete('token');
    return NextResponse.json({
        message: "Logout successful",
        status: 200
    });;
}