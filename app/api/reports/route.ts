import { NextResponse } from "next/server";
import Report from "@/models/Report";
import { dbConnect } from "@/lib/dbConnect";

export async function POST(request: Request) {
  await dbConnect();
  const report = await request.json();

  await Report.create(report);
  return NextResponse.json(
    { messsage: "Report created", data: report },
    { status: 201 }
  );
}

export async function GET() {
  await dbConnect();
  const reports = await Report.find({}).sort("-report_start_date");
  return NextResponse.json({ success: true, data: reports }, { status: 200 });
}
