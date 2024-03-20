import Product from "@/models/Product";

import { NextResponse } from "next/server";
import { connectDB } from '@/libs/mongodb';


export async function GET(request, { params }) {
  connectDB();
  try {
    const productFound = await Product.findById(params.id);

    if (!productFound)
      return NextResponse.json(
        {
          message: "Product not found",
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(productFound);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}

export async function PUT(request, { params }) {
  const body = await request.json();
  console.log("params.id", body)
  
  connectDB();

  try {
    const productUpdated = await Product.findByIdAndUpdate(params.id, body, {
      new: true,
    });
    
    if (!productUpdated)
      return NextResponse.json(
        {
          message: "Product not found",
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(productUpdated);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}

export async function DELETE(request, { params }) {
  connectDB();

  try {
    const productDeleted = await Product.findByIdAndDelete(params.id);

    if (!productDeleted)
      return NextResponse.json(
        {
          message: "Product not found",
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(productDeleted);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}