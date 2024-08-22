import { NextResponse } from "next/server";
import Student from "@/models/Student";
import { dbConnect } from "@/lib/dbConnect";

export async function GET(request: Request, { params }: any) {
  const id = params.id;
  await dbConnect();
  const student = await Student.findOne({ _id: id });
  return NextResponse.json({ success: true, data: student }, { status: 200 });
}
