import { NextResponse } from "next/server";

export function GET() {
  try {
    return NextResponse.json({ hello: "pong" });

  } catch (error) {
    console.log(error)

    return NextResponse.json(
      {
        message: error.message
      })
  }
}