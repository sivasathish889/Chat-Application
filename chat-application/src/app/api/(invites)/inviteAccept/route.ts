import { NextRequest, NextResponse } from "next/server";
import userModel from "@/src/app/api/lib/models/UserModel";
import dbConnection from "@/src/app/api/lib/db";
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

    // Update the current user's friend status where inviter_user matches inviter_id
    await userModel.updateOne(
      { _id: currentUserId._id, "friend.inviter_user": inviter_id },
      { $set: { "friend.$.status": 2 } }
    );

    const updateResult = await userModel.findOneAndUpdate(
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

    if (!updateResult) {
      await userModel.updateOne(
      { _id: inviter_id },
      {
        $push: {
        friend: {
          inviter_user: currentUserId._id,
          status: 2,
        },
        },
      }
      );
    }
    // if (updateResult.modifiedCount === 0) {
    //   return NextResponse.json(
    //     { message: "No invitation found to accept", success: false },
    //     { status: 404 }
    //   );
    // }
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
