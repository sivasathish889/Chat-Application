import { NextRequest, NextResponse } from "next/server";
import userModel from "@/src/app/api/lib/models/UserModel";
import dbConnection from "@/src/app/api/lib/db";
import { JwtPayload, verify } from "jsonwebtoken";
import { userType } from "@/src/app/types/user.type";

export async function GET(req: NextRequest) {
  dbConnection();
  const cookie = await req.cookies.get("__token")?.value;
  const currentUserData = (await verify(
    cookie as string,
    process.env.JWT_SECRET_KEY as string
  )) as JwtPayload;
  try {
    const currentUser = await userModel.findOne({
      _id: currentUserData._id,
      "friend.status": "1",
    });
    if (!currentUser?.friend || currentUser?.friend.length === 0) {
      return NextResponse.json(
        { message: "No Invited User Found", success: false },
        { status: 404 }
      );
    }
    const user = currentUser as userType;
    if (user) {
      const followersIds = user.friend.map((item) =>
        item.inviter_user.toString()
      );
      const invitedUsers = await userModel
        .find({ _id: { $in: followersIds } })
        .lean();
      return NextResponse.json(
        {
          message: "Fetched Invited Users",
          success: true,
          invitedUsers,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error fetching invited users:", error);
    return NextResponse.json(
      { message: error, success: false },
      { status: 500 }
    );
  }
  return NextResponse.json(
    { message: "No Invited User Found", success: false },
    { status: 404 }
  );
}
