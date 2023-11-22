import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        success: true,
        data: [
            {
                id: 1,
                name: "Giogio"
            }
        ]
    })
}