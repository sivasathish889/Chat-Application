import { NextRequest, NextResponse } from "next/server";
import userModel from "../lib/models/UserModel";
import dbConnection from "../lib/db";
import { verify } from "jsonwebtoken";
import { userType } from "../../types/user.type";

export async function GET(req: NextRequest) {
  dbConnection();
  const cookie = await req.cookies.get("__token")?.value;
  const currentUserData = (await verify(
    cookie as string,
    process.env.JWT_SECRET_KEY as string
  )) as { _id: string };
  try {
    await userModel
      .findOne({ _id: currentUserData._id, contact: { $exists: true } })
      .lean()
      .then((data) => {
        const user = data as userType;
        if (!user.contact) {
          return NextResponse.json(
            { message: "No Invited User Found", success: false },
            { status: 404 }
          );
        }
        user.contact.map(async (item) => {
          console.log(item._id);
          await userModel.findById(item._id).then((inviterData) => {
            console.log(inviterData);
            return NextResponse.json(
              { message: "Fetched Invited User", success: true },
              { status: 200 }
            );
          });
        });
      });

    return NextResponse.json(
      { message: "No Invited User Found", success: false },
      { status: 404 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error, success: false },
      { status: 500 }
    );
  }
}
