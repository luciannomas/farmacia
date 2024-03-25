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
        
        const { token } = await request.json();
        console.log("llega token? ", token)
        await connectDB();
        
        // const hash = crypto.createHash("sha256").update('TEST').digest("hex");

        
        const user = await User.findOne({
            resetToken: 'TEST',
            resetTokenExpiry: { $gt: Date.now() }
        })

       if(!user){
        return new NextResponse("Invalid token or has expired", { status: 400 });
       }

       return new NextResponse(JSON.stringify(user), { status: 200 });
        

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