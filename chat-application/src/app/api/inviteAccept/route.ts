import { NextRequest, NextResponse } from "next/server";
import dbConnection from "../lib/db";
import userModel from "../lib/models/UserModel";
import { JwtPayload, verify } from "jsonwebtoken";

export async function POST(req: NextRequest) {
  dbConnection();
  try {
    const body = await req.json();
    const inviter_id = body.id;
    const cookie = req.cookies.get("__token")?.value;
    const currentUserId = verify(
      cookie as string,
      process.env.JWT_SECRET_KEY as string
    ) as JwtPayload;
    if (!inviter_id) {
      return NextResponse.json(
        { message: "ID is required", success: false },
        {
          status: 400,
        }
      );
    }

    await userModel.findOneAndUpdate(
      { _id: currentUserId._id, "friend.inviter_user": inviter_id },
      { $set: { "friend.$.status": 2 } },
      { new: true }
    );
    await userModel.findOneAndUpdate(
      {
      _id: inviter_id,
      "friend.inviter_user": currentUserId._id,
      },
      {
      $set: {
        "friend.$.status": 2,
      },
      },
      { new: true }
    );
    return NextResponse.json(
      {
        message: "Invitation accepted successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error accepting invitation:", error);
    return NextResponse.json(
      {
        message: "Failed to accept invitation",
        success: false,
      },
      { status: 500 }
    );
  }
}
