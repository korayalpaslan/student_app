import { NextResponse } from "next/server";
import User from "@/models/User";
import { dbConnect } from "@/lib/dbConnect";
import { hashSync } from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();
  const { name, branch, email, password, isVerified, role } =
    await request.json();
  const hashedPassword = await hashSync(password, 8);

  try {
    const user = await User.findOne({ email: email });

    if (user) {
      return NextResponse.json(
        { messsage: "User already exist" },
        { status: 422 }
      );
    }
    await User.create({
      name,
      branch,
      role,
      email,
      isVerified,
      password: hashedPassword,
    });
    return NextResponse.json({ messsage: "User registered" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "An error occured while registering the user.",
      },
      { status: 500 }
    );
  }
}
