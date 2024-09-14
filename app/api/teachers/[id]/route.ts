import { NextResponse } from "next/server";
import User from "@/models/User";
import { dbConnect } from "@/lib/dbConnect";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/lib/authOptions";

export async function PATCH(request: Request, { params }: any) {
  await dbConnect();
  const id = params.id;
  const user = await User.findOne({ _id: id });
  let verified;
  if (user.isVerified) {
    verified = false;
  } else {
    verified = true;
  }
  await User.findOneAndUpdate({ _id: id }, { isVerified: verified });
  return NextResponse.json({ success: true, data: verified }, { status: 200 });
}
