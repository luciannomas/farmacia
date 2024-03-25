import { NextResponse } from "next/server";
import { connectDB } from "@/libs/mongodb";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "../../../../models/User";

export async function POST(request) {
    try {

        const { email, password } = await request.json();
        console.log("email", email);
        console.log("password", password);
        await connectDB();

        const userFound = await User.findOne({ email });

        // hashing the password
        const newPassword = await bcrypt.hash(password, 10);

        // update
        userFound.password = newPassword;

        userFound.resetToken = undefined;
        userFound.resetTokenExpiry = undefined;

        await userFound.save();
        return new NextResponse("User's password is updated", { status: 200 });

    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return NextResponse.json(
                {
                    message: error.message,
                },
                {
                    status: 408,
                }
            );
        }
        return NextResponse.error();
    }
};