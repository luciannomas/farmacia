import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import mongoose from "mongoose";

export async function GET()  {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("myTokenName");


    if (!token) {
      return NextResponse.json({ error: "Not logged in" }, { status: 401 });
    }

    // console.log("very",jwt.verify(token.value, "TOKEN_SECRET"))
    const { email, id } = jwt.verify(token.value, "TOKEN_SECRET");

    return NextResponse.json({
      email,
      id,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 400,
        }
      );
    }
    return NextResponse.error();
  }
}