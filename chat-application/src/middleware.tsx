import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export const config = {
  matcher: ["/:path*"],
};

const publicRoutes = ["/login", "/sign-up"];

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("__token")?.value || "";
  const isPublic = publicRoutes.includes(req.nextUrl.pathname);

  if (isPublic) {
    // If route is public and user is already logged in, redirect to home
    if (token) {
      try {
        const secret = new TextEncoder().encode(
          process.env.JWT_SECRET_KEY as string
        );
        await jwtVerify(token, secret);
        return NextResponse.redirect(new URL("/", req.url));
      } catch (e) {
        // Invalid token, allow access to public route
        return NextResponse.next();
      }
    }
    // No token, allow access to public route
    return NextResponse.next();
  } else {
    // Protected route: require valid token
    if (token) {
      // try {
      const secret = new TextEncoder().encode(
        process.env.JWT_SECRET_KEY as string
      );
      await jwtVerify(token, secret);
      return NextResponse.next();
      // } catch (error) {
      //   // Invalid token, redirect to login
      //   return NextResponse.redirect(new URL("/login", req.url));
      // }
    } else {
      // No token, redirect to login
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
}
