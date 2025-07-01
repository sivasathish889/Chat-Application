import { JwtPayload, sign, verify } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  try {
    const userOtp = (formData.get("otp") as string) || null;
    const hashToken = req.cookies.get("__otp__string")?.value || "";
    const { otp, _id } = verify(
      hashToken,
      process.env.JWT_SECRET_KEY as string
    ) as JwtPayload;
    console.log(otp);
    // otp check
    if (userOtp == otp) {
      const response = NextResponse.json(
        { message: "Verified Welcome User", success: true },
        { status: 200 }
      );
      const hashingToken = sign({ _id }, process.env.JWT_SECRET_KEY as string, {
        algorithm: "HS256",
      });
      // set primary cookie in user Id
      response.cookies.set("__token", hashingToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });
      response.cookies.delete("__otp__string");
      return response;
    } else {
      return NextResponse.json(
        { message: "Wrong Otp", success: false },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: `Server Error ${error}`, success: false },
      { status: 500 }
    );
  }
}
