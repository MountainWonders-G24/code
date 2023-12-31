import { NextResponse } from "next/server";
import { cookies } from "next/headers";


export async function GET()  {
    const cookieStore = cookies();
    if (!cookieStore.get('email')&& !cookieStore.get('token')) {
        return NextResponse.json({
            message: "You need to log in to use this API!",
            status: 401
        });
    }
    cookieStore.delete('email');
    cookieStore.delete('token');
    return NextResponse.json({
        message: "Logout successful",
        status: 200
    });;
}