import { JwtPayload, verify } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const userOtp = (formData.get("otp") as string) || null;
  const hashToken = req.cookies.get("__otp__string")?.value || "";
  const { otp } = verify(hashToken, process.env.JWT_SECRET_KEY as string) as JwtPayload;
  console.log(otp)
  if (userOtp == otp) {
    const response =  NextResponse.json(
      { message: "Verified Welcome User", success: true },
      { status: 200 }
    )
    response.cookies.delete('__otp__string')
    return response;
  } else {
    return NextResponse.json(
      { message: "Wrong Otp", success: false },
      { status: 400 }
    );
  }
}
