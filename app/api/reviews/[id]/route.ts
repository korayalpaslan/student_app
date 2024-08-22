import { NextResponse } from "next/server";
import Review from "@/models/Review";
import { dbConnect } from "@/lib/dbConnect";

export async function GET(request: Request, { params }: any) {
  const id = params.id;
  await dbConnect();
  const review = await Review.findOne({ _id: id });
  return NextResponse.json({ success: true, data: review }, { status: 200 });
}
