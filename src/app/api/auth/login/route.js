'use server'
import { NextResponse } from "next/server";
import { connectDB } from "@/libs/mongodb";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "../../../../models/User";
import { createAccessToken } from '../../../../libs/jwt';
import { cookies } from 'next/headers'

export async function POST(request) {
    try {
        await connectDB();
        const { email, password } = await request.json();
    
        const userFound = await User.findOne({ email });
       
        if (!userFound)
            return NextResponse.json({
                message: ["The email does not exist"],
            }, { status: 400 });

        const isMatch = await bcrypt.compare(password, userFound.password);
        console.log("isMatch", userFound.password)
        if (!isMatch) {
            return NextResponse.json({
                message: ["The password is incorrect"],
            }, { status: 400 });
        };

        // create access token
        const token = await createAccessToken({
            id: userFound._id,
            email
        });

        const response = cookies().set({
            name: 'myTokenName',
            value: token,
            httpOnly: true,
            path: '/',
        })
        // console.log("response.getAll()", response.getAll())

        return NextResponse.json({
            // id: userFound._id,
            username: userFound.fullname,
            email: userFound.email,
        }, { status: 202 });

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