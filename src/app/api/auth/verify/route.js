'use server'
import { NextResponse } from "next/server";
import { connectDB } from "@/libs/mongodb";
import mongoose from "mongoose";
import User from "../../../../models/User";
import jwt from "jsonwebtoken";

export async function POST(request) {
    try {
        
        const { token } = await request.json();
        await connectDB();
        
        //verify token con clave unica
        const { email } = jwt.verify(token, "TOKEN_SECRET");

        //otra manera verify
        //const hash = crypto.createHash("sha256").update(token).digest("hex");
        
        const user = await User.findOne({
            email: email,
            resetToken: token,
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