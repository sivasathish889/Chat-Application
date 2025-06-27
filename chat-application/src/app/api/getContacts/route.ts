import { NextRequest, NextResponse } from "next/server";
import dbConnection from "../lib/db";
import { JwtPayload, verify } from "jsonwebtoken";
import userModel from "../lib/models/UserModel";

export async function GET(req: NextRequest) {
  try {
    dbConnection();
    const cookie = await req.cookies.get("__token")?.value;
    const hashingUserId = (await verify(
      cookie as string,
      process.env.JWT_SECRET_KEY as string
    )) as JwtPayload;
    const user = await userModel.findOne(
      { _id: hashingUserId._id },
      { friend: 1 }
    );
    const userContactData = user.friend.filter((f: any) => f.status == "2");
    interface Friend {
      inviter_user: string;
      status: string;
    }

    const contactsUsers = await Promise.all(
      userContactData.map(async (item: Friend) => {
        return await userModel.findById(item.inviter_user);
      })
    );
    return NextResponse.json(
      {
        message: "contact fetched successfully",
        contactsUsers,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error", success: false },
      { status: 500 }
    );
  }
}
