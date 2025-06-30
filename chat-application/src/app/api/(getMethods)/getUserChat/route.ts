import { NextRequest, NextResponse } from "next/server";
import ConservationModal from "@/src/app/api/lib/models/ConservationModel";
import dbConnection from "@/src/app/api/lib/db";
import { JwtPayload, verify } from "jsonwebtoken";

export async function GET(req: NextRequest) {
  try {
    dbConnection();
    const cookie = await req.cookies.get("__token")?.value;
    const currentUserId = (await verify(
      cookie as string,
      process.env.JWT_SECRET_KEY as string
    )) as JwtPayload;
    const params = req.nextUrl.searchParams;
    const to_userId = params.get("id") || "";
    console.log(currentUserId._id, to_userId);
    const chats = await ConservationModal.find(
      {
        $or: [
          { senderId: currentUserId._id, receiverId: to_userId },
          { senderId: to_userId, receiverId: currentUserId._id },
        ],
      },
      { senderId: 1, receiverId: 1, message: 1, createdAt: 1, _id : 0}
    );
    return NextResponse.json(
      { message: "Chats Fetched", success: true, chats },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Server Error", success: false },
      { status: 500 }
    );
  }
}
