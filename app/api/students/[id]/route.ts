import { NextResponse } from "next/server";
import Student from "@/models/Student";
import { dbConnect } from "@/lib/dbConnect";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/lib/authOptions";

export async function PATCH(request: Request, { params }: any) {
  await dbConnect();
  const id = params.id;
  const student = await request.json();
  await Student.findOneAndUpdate({ _id: id }, student);
  return NextResponse.json({ success: true, data: student }, { status: 200 });
}

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
  const student = await Student.findOne({ _id: id });
  return NextResponse.json({ success: true, data: student }, { status: 200 });
}
