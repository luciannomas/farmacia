import User from "../../../../models/User";
import { NextResponse } from "next/server";
import { connectDB } from '@/libs/mongodb';

export async function GET() {
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

        body.resetToken = 'resetToken__';
        const UserUpdated = await User.findByIdAndUpdate(UserFound._id.toString(), body, {
            new: true,
        });

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