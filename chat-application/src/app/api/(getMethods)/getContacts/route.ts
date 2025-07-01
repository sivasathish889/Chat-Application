import { NextRequest, NextResponse } from "next/server";
import { JwtPayload, verify } from "jsonwebtoken";
import userModel from "@/src/app/api/lib/models/UserModel";
import dbConnection from "@/src/app/api/lib/db";
interface Friend {
  inviter_user: string;
  status: string;
}

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

    const userContactData = user.friend.filter((f: Friend) => f.status == "2");

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
  } catch {
    return NextResponse.json(
      { message: "Server Error", success: false },
      { status: 500 }
    );
  }
}
