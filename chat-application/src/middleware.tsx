import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/", "/login", "/sign-up"],
};

const publicRoutes = ["/login", "/sign-up"];

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("__token")?.value || "";
  const isPublic = publicRoutes.includes(req.nextUrl.pathname);
  if (token && isPublic) {
    return NextResponse.redirect(new URL("/", req.url));
  } else if (!token && !isPublic) {
    return NextResponse.redirect(new URL("/login", req.url));
  } else if (token && !isPublic) {
    return NextResponse.next();
  } else if (!token && isPublic) {
    return NextResponse.next();
  } else {
  }
  return NextResponse.next();
}

// const secret = new TextEncoder().encode(
//   process.env.JWT_SECRET_KEY as string
// );
// await jwtVerify(token, secret);
// return NextResponse.redirect(new URL("/", req.url));
