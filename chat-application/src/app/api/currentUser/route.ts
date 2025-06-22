import { verify } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import getUser from "../actions/getUser";
import userModel from "../lib/models/UserModel";

export async function GET(req: NextRequest) {
  const cookie = await req.cookies.get("__token")?.value;
  const hashingData = await verify(
    cookie as string,
    process.env.JWT_SECRET_KEY as string
  );
  const userData = await userModel.findById((hashingData as any)._id).then((userData) => {});
  return NextResponse.json({
    message: "Fetched SuccessFully",
    userData,
    success: true,
  });
}
