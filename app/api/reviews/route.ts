import { NextRequest, NextResponse } from "next/server";
import Review from "@/models/Review";
import { dbConnect } from "@/lib/dbConnect";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/lib/authOptions";

export async function POST(request: Request) {
  await dbConnect();
  const review = await request.json();

  await Review.create(review);
  return NextResponse.json(
    { messsage: "Review created", data: review },
    { status: 201 }
  );
}

export async function GET(request: NextRequest) {
  await dbConnect();
  const query = request.nextUrl.searchParams.get("query");
  let reviews;
  if (query) {
    reviews = await Review.find({ student: query }).sort("-lesson_date");
  } else {
    reviews = await Review.find({}).sort("-lesson_date");
  }

  return NextResponse.json({ success: true, data: reviews }, { status: 200 });
}
