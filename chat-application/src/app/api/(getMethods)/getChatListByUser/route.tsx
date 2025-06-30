import { NextRequest, NextResponse } from "next/server";
import userModel from "@/src/app/api/lib/models/UserModel";
import dbConnection from "@/src/app/api/lib/db";
import { JwtPayload, verify } from "jsonwebtoken";
import ConservationModel from "../../lib/models/ConservationModel";
import { friendType } from "@/src/app/types/user.type";

type userFriendListType = {
  _id: string;
  friend: [friendType];
};
export async function GET(req: NextRequest) {
  dbConnection();
  try {
    const cookie = await req.cookies.get("__token")?.value;
    const hashingData = (await verify(
      cookie as string,
      process.env.JWT_SECRET_KEY as string
    )) as JwtPayload;

    const userId = hashingData.id || hashingData._id || hashingData.userId;
    const userFriendList = await ConservationModel.find({
      $or: [{ senderId: userId }, { receiverId: userId }],
    }).sort({ createdAt: -1 });
    const friendIds = userFriendList.map((item) => {
      if (item.senderId == userId) {
        return item.receiverId;
      } else if (item.receiverId == userId) {
        return item.senderId;
      }
      return null;
    });
    const uniqueFriendIds = Array.from(
      new Set(friendIds.filter(Boolean).map((id) => id.toString()))
    );
    const friends = await Promise.all(
      uniqueFriendIds.map(async (friendId) => {
        return await userModel.findById(
          {
            _id: friendId,
          },
          { username: 1, avatar: 1, email: 1, createdat: 1 }
        );
      })
    );
    return NextResponse.json(
      { message: "fetched Success", friends, success: true },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: error, success: false },
      { status: 500 }
    );
  }
}
