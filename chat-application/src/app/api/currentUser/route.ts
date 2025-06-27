import { JwtPayload, verify } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import userModel from "../lib/models/UserModel";
import dbConnection from "../lib/db";

export async function GET(req: NextRequest) {
  dbConnection()
  const cookie = await req.cookies.get("__token")?.value;
  const hashingData = await verify(
    cookie as string,
    process.env.JWT_SECRET_KEY as string
  ) as JwtPayload
  const userData = await userModel.findById((hashingData as any)._id)
  return NextResponse.json({
    message: "Fetched SuccessFully",
    userData : JSON.stringify(userData),
    success: true,
  });
}
