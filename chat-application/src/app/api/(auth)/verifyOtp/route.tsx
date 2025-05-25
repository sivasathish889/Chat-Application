import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const userOtp = (formData.get("otp") as string) || null;
  const VerifyOtp = (formData.get("verifyOtp") as string) || null;

  if (userOtp == VerifyOtp) {
    return NextResponse.json(
      { message: "Verified Welcome User" },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      { message: "Wrong Otp" },
      { status: 200 }
    );
  }
}
