
import User from "@/app/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/configs/dbConfig";

connectDB();
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();

        const userExists = await User.findOne({
            email: reqBody.email
        });

        if (userExists) {
            throw new Error("User already exists")
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(reqBody.password, salt);
        reqBody.password = hashedPassword;

        const newUser = new User(reqBody);
        await newUser.save();

        return NextResponse.json({
            message: "User created successfully",
            data: newUser,
            status: 201
        })
    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
            status: 401
        });
    }

}