import { NextRequest, NextResponse } from "next/server";
import userModel from "../lib/models/UserModel";
import dbConnection from "../lib/db";
import { verify } from "jsonwebtoken";

export async function POST(req: NextRequest) {
  dbConnection();
  try {
    const formData = req.formData();
    const inviterId = (await formData).get("inviterId");
    const cookie = await req.cookies.get("__token")?.value;
    const currentUserId = await verify(
      cookie as string,
      process.env.JWT_SECRET_KEY as string
    );
    await userModel
      .findByIdAndUpdate(inviterId, {
        contact: { from_Inviter: currentUserId, status: 1 },
      })
      .catch((err) => {
        return NextResponse.json(
          { message: err.message, success: false },
          { status: 500 }
        );
      });

    return NextResponse.json(
      { message: "Invite Successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error, success: false },
      { status: 500 }
    );
  }
}
