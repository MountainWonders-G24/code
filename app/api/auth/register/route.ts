
import User from "@/app/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/configs/dbConfig";

connectDB();
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        //check if the user already exists
        const userExists = await User.findOne({
            email: reqBody.email
        });
        if (userExists) {
            throw new Error("User already exists");
        } else {
            // create new user
            // random string
            const salt = await bcrypt.genSalt(10);
            // hashing the pwd
            const hashedPassword = await bcrypt.hash(reqBody.password, salt);
            reqBody.password = hashedPassword;
            const newUser = new User(reqBody);
            await newUser.save();
            return NextResponse.json({
                message: "User created successfully",
                data: newUser,
            })
        }
    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
        },
            {
                status: 400
            }
        );
    }

}