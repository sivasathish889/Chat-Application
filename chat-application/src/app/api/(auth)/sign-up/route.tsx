import { NextRequest, NextResponse } from "next/server";
import userModel from "@/src/app/api/lib/models/UserModel";
import { hashSync } from "bcryptjs";
import { promises as fs } from "fs";
import path from "path";
import { v4 as uuid } from "uuid";

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get("profileImage") as File;
    const username = (form.get("userName") as string) || null;
    const password = (form.get("password") as string) || null;
    const email = (form.get("email") as string) || null;
    const phone = (Number(form.get("phone")) as number) || null;
    const fileData = await file.arrayBuffer();
    let filePath: string | null = null;
    if(file.size !== 0){
      filePath = path.join(
        process.cwd(),
        "/public/uploads",
        uuid() + file.name
      );
      await fs.writeFile(filePath, Buffer.from(fileData));
    }
    if (!username || !password || !email) {
      return NextResponse.json(
        { message: "Fields are Required" },
        { status: 404 }
      );
    }
    const hashPassword = hashSync(password, 10);
    const existingUser = await userModel.findOne({
      $or: [{ email: email }, { username: username }],
    });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists", success: false },
        { status: 400 }
      );
    }
    await userModel.create({
      username: username,
      email: email,
      phone: phone,
      password: hashPassword,
      avatar: filePath ,
    });
    return NextResponse.json(
      { message: "Profile Created", success: true },
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
