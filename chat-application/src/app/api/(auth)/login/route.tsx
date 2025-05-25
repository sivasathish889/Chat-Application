import { NextRequest, NextResponse } from "next/server";
import sendMail from "../../helpers/sendMail";
import userModel from "@/src/app/lib/models/UserModel";
import { compareSync } from "bcryptjs";

interface mailType {
  to: string;
  subject: string;
  text: string;
}
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const email = (formData.get("email") as string) || null;
  const password = formData.get("password") as string;
  try {
    if (!email) {
      return NextResponse.json(
        { message: "E-mail Required", success: false },
        { status: 401 }
      );
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }
    const comparePass = compareSync(password, user.password);
    if (comparePass) {
      const randomOtp = Math.floor(Math.random() * 10000);
      const maildata: mailType = {
        to: email,
        subject: "Chat Application OTP",
        text: `Your OTP is + ${randomOtp}`,
      };

      await sendMail(maildata);
      return NextResponse.json(
        { message: "OTP Send Successfully", success: true, otp: randomOtp },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Incorrect Password", success: false },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error", success: false },
      { status: 500 }
    );
  }
}
