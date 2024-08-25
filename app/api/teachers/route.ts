import { NextResponse } from "next/server";
import User from "@/models/User";
import { dbConnect } from "@/lib/dbConnect";

export async function POST(request: Request) {
  await dbConnect();
  const teacher = await request.json();
  await User.create(teacher);
  return NextResponse.json(
    { messsage: "Teacher created", data: teacher },
    { status: 201 }
  );
}

export async function GET() {
  await dbConnect();
  const teachers = await User.find({})
    .select("-password")
    .sort({ name: "asc" });
  return NextResponse.json({ success: true, data: teachers }, { status: 200 });
}
