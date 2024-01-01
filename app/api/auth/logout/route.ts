import { NextResponse } from "next/server";
import { cookies } from "next/headers";


export async function GET()  {
    const cookieStore = cookies();
    const email = cookieStore.get('email');
    const token = cookieStore.get('token');

    if (!email || !token) {
        return NextResponse.json({
            message: "Not authorized",
            status: 403
        });
    }
    

    cookieStore.delete('email');
    cookieStore.delete('token');
    return NextResponse.json({
        message: "Logout successful",
        status: 200
    });;
}