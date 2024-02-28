import Product from "@/models/Product";
import { NextResponse } from "next/server";
import { connectDB } from '@/libs/mongodb';

export async function GET() {
  await connectDB();
  const products = await Product.find();
  return NextResponse.json(products);
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const newProduct = new Product(body);
    const savedProduct = await newProduct.save();
    return NextResponse.json(savedProduct);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}