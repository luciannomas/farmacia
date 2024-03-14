import { NextResponse } from "next/server";
import { connectDB } from '@/libs/mongodb';
import User from '../../../models/user';
import crypto from 'crypto';


export async function POST(request) {
    try {
      const { email, password } = await request.json();
      
      await connectDB();

     /*  if (password < 6)
        return NextResponse.json(
          { message: "Password must be at least 6 characters" },
          { status: 400 }
        ); */
  
      const userFound = await User.findOne({ email });
  
      if (!userFound)
        return NextResponse.json(
          {
            message: "Email not exists",
          },
          {
            status: 409,
          }
        );
  
      //const hashedPassword = await bcrypt.hash(password, 12);
    const resetToken = crypto.randomBytes(20).toString("hex");
    const passwordResetToken = crypto
          .createHash("lucho123")
          .update(resetToken)
          .digest("hex");

    const passwordResetExpires = Date.now() + 3600000; // 1 hora

    userFound.resetToken = passwordResetToken;
    userFound.resetTokenExpires = passwordResetExpires;
    const resetUrl = `localhost:3000/reset/${resetToken}`;
   return console.log(" resetUrl",resetUrl)

      return NextResponse.json({ status: 201 });
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
