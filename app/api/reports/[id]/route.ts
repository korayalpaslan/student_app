import { NextResponse } from "next/server";
import Report from "@/models/Report";
import { dbConnect } from "@/lib/dbConnect";

export async function GET(request: Request, { params }: any) {
  await dbConnect();
  const id = params.id;
  const report = await Report.findOne({ _id: id });
  return NextResponse.json({ success: true, data: report }, { status: 200 });
}
