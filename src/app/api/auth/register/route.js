
import { NextResponse } from "next/server";
import { connectDB } from "@/libs/mongodb";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "@/models/User";
import { createAccessToken } from '../../../../libs/jwt';
import { sign } from "jsonwebtoken";
import { serialize } from 'cookie';
import { cookies } from 'next/headers'

export async function POST(request) {
    try {
        await connectDB();
        const { fullname, email, password } = await request.json();

        const userFound = await User.findOne({ email });

        if (password.length < 8)
            return NextResponse.json(
                { message: "Password must be at least 7 characters" },
                { status: 400 }
            );

        if (userFound)
            return NextResponse.json({
                message: ["The email is already in use"],
            }, { status: 400 });
        
            if (fullname.length < 3 || fullname === null)
            return NextResponse.json(
                { message: "Fullname must be at leat 3 characters" },
                { status: 400 }
            );
        

        // hashing the password
        const passwordHash = await bcrypt.hash(password, 10);

        // creating the user
        const newUser = new User({
            fullname,
            email,
            password: passwordHash,
        });

        // saving the user in the database
        const userSaved = await newUser.save();

        // create access token
        const token = await createAccessToken({
            id: userSaved._id,
        });

        /* const token = sign(
            {
              exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 dias
              email,
              fullname
              
            },
            "secret" // reemplazar por una var de entorno
          ); */

        // TODO: 3 manera de serializar

        /* const serialized = serialize('myTokenName', token, {
            httpOnly: true, // en prod no pueden ver la cookie desde consola
            secure: "http://localhost:3000/" === "production", // se applica para prod
            sameSite: "strict", // tiene varias opciones para comunicarse con otros servidores por ej. "none"
            maxAge: 1000 * 60 * 60 * 24 * 30,
            path: "/", // ruta donde es entregado la cookie
        }); */

        // otra manera de setteo
        /* response.cookies.set({
            name: "myTokenName",
            value: token,
            httpOnly: true,
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24 * 30,
            path: "/",
        }); */
        
        const response = cookies().set({
            name: 'myTokenName',
            value: token,
            httpOnly: true,
            path: '/',
          })

        //TODO: para borrar cookes
        //cookies().delete('name')
        console.log("response", response.getAll())

        return NextResponse.json({
            token
        })
        
        /* return NextResponse.json({
            // id: userSaved._id,
            username: userSaved.fullname,
            email: userSaved.email,
        }, { status: 201 }); */

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
};
