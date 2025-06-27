import { NextRequest, NextResponse } from "next/server";
import ConservationModal from "../lib/models/ConservationModel";
import dbConnection from "../lib/db";
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
    const chats = await ConservationModal.find({
      from_user: currentUserId,
      to_user: to_userId,
    });
    return NextResponse.json(
      { message: "Chats Fetched", success: true, chats },
      { status: 200 }
    );
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: "Server Error", success: false },
      { status: 500 }
    );
  }
}
