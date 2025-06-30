import { NextRequest, NextResponse } from "next/server";
import userModel from "@/src/app/api/lib/models/UserModel";
import dbConnection from "@/src/app/api/lib/db";
import { JwtPayload, verify } from "jsonwebtoken";

export async function POST(req: NextRequest) {
  dbConnection();
  try {
    const formData = req.formData();
    const inviterId = (await formData).get("inviterId");
    const cookie = req.cookies.get("__token")?.value;
    const currentUserId = verify(
      cookie as string,
      process.env.JWT_SECRET_KEY as string
    ) as JwtPayload;

    await userModel.findByIdAndUpdate(inviterId, {
      $push: {
        friend: {
          inviter_user: currentUserId._id,
          status: 1, // 1 for pending invite
        },
      },
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
