import { NextRequest, NextResponse } from "next/server";
import userModel from "../lib/models/UserModel";
import { JwtPayload, verify } from "jsonwebtoken";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const cookie = req.cookies.get("__token")?.value;
  const currentUser = verify(
    cookie as string,
    process.env.JWT_SECRET_KEY as string
  ) as JwtPayload;

  if (!email) {
    return NextResponse.json(
      JSON.stringify({ error: "Email query param required", success: false }),
      { status: 400 }
    );
  }
  let users = await userModel.find({
    email: { $regex: `${email}`, $options: "i" },
    _id: { $ne: currentUser._id },
    $or: [
      { friend: { $size: 0 } },
      { "friend.inviter_user": { $ne: currentUser._id } },
      { "friend.status": 0 }
    ],
  });
  return NextResponse.json(
    JSON.stringify({
      users,
      message: "Fetched Users Successfully",
      success: true,
    }),
    { status: 200 }
  );
}
