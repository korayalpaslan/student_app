import { NextRequest, NextResponse } from "next/server";
import Review from "@/models/Review";
import { dbConnect } from "@/lib/dbConnect";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/lib/authOptions";

export async function POST(request: Request) {
  await dbConnect();
  // const session = await getServerSession(authOptions);
  // if (!session) {
  //   return NextResponse.json(
  //     { messsage: "Not authorized url" },
  //     { status: 401 }
  //   );
  // }
  const review = await request.json();

  await Review.create(review);
  return NextResponse.json(
    { messsage: "Review created", data: review },
    { status: 201 }
  );
}

export async function GET(request: NextRequest) {
  await dbConnect();
  // const session = await getServerSession(authOptions);
  // if (!session) {
  //   return NextResponse.json(
  //     { messsage: "Not authorized url" },
  //     { status: 401 }
  //   );
  // }
  const query = request.nextUrl.searchParams.get("query");
  const reviews = await Review.find({ student: query }).sort("-lesson_date");
  return NextResponse.json({ success: true, data: reviews }, { status: 200 });
}
