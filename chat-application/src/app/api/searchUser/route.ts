import { NextRequest, NextResponse } from "next/server";
import userModel from "../lib/models/UserModel";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  if (!email) {
    return NextResponse.json(
      JSON.stringify({ error: "Email query param required" }),
      { status: 400 }
    );
  }
  let users = await userModel.find({
    email: { $regex: `${email}`, $options: "i" },
    inviteStatus: { $ne: "pending" },
  });
  console.log(users);
  return NextResponse.json(JSON.stringify(users), { status: 200 });
}
