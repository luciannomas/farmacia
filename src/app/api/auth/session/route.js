import Session from "../../../../models/Session";
import { NextResponse } from "next/server";
import { connectDB } from '@/libs/mongodb';

export async function GET() {
    await connectDB();
    const users = await Session.find();
    return NextResponse.json(users);
}

export async function POST(request) {
    try {
        await connectDB();
        const body = await request.json();
        const newSession = new Session(body);
        const savedSession = await newSession.save();
        return NextResponse.json(savedSession);
    } catch (error) {
        return NextResponse.json(error.message, {
            status: 400,
        });
    }
}

export async function PUT(request) {
    // const body = await request.json();
    const email = 'lucanox@smail.com';
    const body = {
        fullname: 'eeelasdmd',
        password: 'luciano123'
    }
    console.log("body", body)
    connectDB();
    const SessionFound = await Session.findOne({ email });

    if (!SessionFound)
        return NextResponse.json({
            message: ["The email does not exist"],
        }, { status: 400 });

    try {
        const sessionUpdated = await Session.findByIdAndUpdate('65fa20e58af7840c00dacc47', body, {
            new: true,
        });

        if (!sessionUpdated)
            return NextResponse.json(
                {
                    message: "Session not found",
                },
                {
                    status: 404,
                }
            );

        return NextResponse.json(sessionUpdated);
    } catch (error) {
        return NextResponse.json(error.message, {
            status: 400,
        });
    }
}