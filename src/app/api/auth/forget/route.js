import User from "../../../../models/User";
import { NextResponse } from "next/server";
import { connectDB } from '@/libs/mongodb';
import crypto from 'crypto';

/* export async function GET() {
    await connectDB();
    const users = await User.find();
    return NextResponse.json(users);
}

export async function POST(request) {
    try {
        await connectDB();
        const body = await request.json();
        const newUser = new User(body);
        const savedUser = await newUser.save();
        return NextResponse.json(savedUser);
    } catch (error) {
        return NextResponse.json(error.message, {
            status: 400,
        });
    }
}
 */
export async function PUT(request) {
    const body = await request.json();
    const { email } = body;

    connectDB();

    const UserFound = await User.findOne({ email });

    if (!UserFound)
        return NextResponse.json({
            message: ["The email does not exist"],
        }, { status: 400 });

    try {
        
        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiry = new Date();

        // lo encrypta (sha256 clave, cambiarla)
        const passwordResetToken = crypto
            .createHash("sha256") 
            .update(resetToken)
            .digest("hex");

        // expira en una hora 
        const passwordResetExpires = Date.now(20) + 3600000; 

        //update to base
        body.resetToken = 'TEST';
        body.resetTokenExpiry = passwordResetExpires; 
        
        // body.resetToken = 'resetToken__';
        const UserUpdated = await User.findByIdAndUpdate(UserFound._id.toString(), body, {
            new: true,
        });

        //build url reset
        const resetUrl = `locahost:3000/reset-password/${resetToken}`;
        console.log("resetUrl", resetUrl);

        if (!UserUpdated)
            return NextResponse.json(
                {
                    message: "User not found",
                },
                {
                    status: 404,
                }
            );

        return NextResponse.json(UserUpdated);
    } catch (error) {
        return NextResponse.json(error.message, {
            status: 400,
        });
    }
}