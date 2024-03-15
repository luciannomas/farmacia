'use server'
export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { connectDB } from "@/libs/mongodb";

export async function GET() {

    try {
        await connectDB();
        const cookieStore = cookies();
        const token = cookieStore.get("myTokenName");
        console.log("entro!!")

        if (!token) {
            return NextResponse.json({ error: "Not logged in" }, { status: 401 });
        }

        // console.log("very",jwt.verify(token.value, "TOKEN_SECRET"))
        const { email, id } = jwt.verify(token.value, "TOKEN_SECRET");

        return NextResponse.json({
            email,
            id,
        });

        const response = NextResponse.json(
            {},
            {
              status: 200,
            }
          );

    } catch (error) {
        console.log(error);
        return NextResponse.json(error.message, {
            status: 500,
        });
    }
}
