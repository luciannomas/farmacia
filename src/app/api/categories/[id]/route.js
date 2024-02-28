import Category from "@/models/Category";
import { NextResponse } from "next/server";
import { connectDB } from '@/libs/mongodb';


export async function GET(request, { params }) {
  connectDB();
  try {
    const categoryFound = await Category.findById(params.id);

    if (!categoryFound)
      return NextResponse.json(
        {
          message: "Category not found",
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(categoryFound);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}

export async function PUT(request, { params }) {
  const body = await request.json();
  connectDB();

  try {
    const categoryUpdated = await Category.findByIdAndUpdate(params.id, body, {
      new: true,
    });

    if (!categoryUpdated)
      return NextResponse.json(
        {
          message: "Category not found",
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(categoryUpdated);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}

export async function DELETE(request, { params }) {
  connectDB();

  try {
    const categoryDeleted = await Category.findByIdAndDelete(params.id);

    if (!categoryDeleted)
      return NextResponse.json(
        {
          message: "Category not found",
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(categoryDeleted);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}