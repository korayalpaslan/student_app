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
  const page = request.nextUrl.searchParams.get("page");

  let data1;
  let data2;
  let dataResponses;
  if (query) {
    data1 = Review.find({ student: query })
      .sort("-lesson_date")
      .limit(5)
      .skip(5 * (Number(page) - 1));
    data2 = Review.find({ student: query }).sort("-lesson_date");
  } else {
    data1 = Review.find({}).sort("-lesson_date");
    data2 = Review.find({}).sort("-lesson_date");
  }
  const [reviews, totalReviews]: any = await Promise.all([data1, data2]);

  return NextResponse.json(
    { success: true, data: reviews, length: totalReviews.length },
    { status: 200 }
  );
}
