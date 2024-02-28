import Category from "@/models/Category";
import { NextResponse } from "next/server";
import { connectDB } from '@/libs/mongodb';

export async function GET() {
  await connectDB();
  const category = await Category.find();
  return NextResponse.json(category);
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const newCategory = new Category(body);
    const savedCategory = await newCategory.save();
    return NextResponse.json(savedCategory);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}