import { NextResponse } from "next/server";
import Student from "@/models/Student";
import { dbConnect } from "@/lib/dbConnect";

export async function POST(request: Request) {
  await dbConnect();
  const student = await request.json();

  await Student.create(student);
  return NextResponse.json(
    { messsage: "Student created", data: student },
    { status: 201 }
  );
}

export async function GET() {
  await dbConnect();
  const students = await Student.find({}).sort({ name: "asc" });
  return NextResponse.json({ success: true, data: students }, { status: 200 });
}
