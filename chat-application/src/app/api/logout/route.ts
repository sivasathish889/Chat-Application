import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const response = NextResponse.json({ message: "Logged out" });
  response.cookies.delete("__token");
  return response;
}
