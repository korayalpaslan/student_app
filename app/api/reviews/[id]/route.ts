import { NextResponse } from "next/server";
import Review from "@/models/Review";
import { dbConnect } from "@/lib/dbConnect";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/lib/authOptions";

export async function GET(request: Request, { params }: any) {
  await dbConnect();

  // const session = await getServerSession(authOptions);
  // if (!session) {
  //   return NextResponse.json(
  //     { messsage: "Not authorized url" },
  //     { status: 401 }
  //   );
  // }
  const id = params.id;
  const review = await Review.findOne({ _id: id });
  return NextResponse.json({ success: true, data: review }, { status: 200 });
}
