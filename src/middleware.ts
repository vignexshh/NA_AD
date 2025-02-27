// middleware.ts
import { NextResponse } from "next/server";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export async function middleware(request: Request) {
  const auth = getAuth();
  const user = await new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => resolve(user));
  });

  if (!user && new URL(request.url).pathname.startsWith("/dashboard/rank-exp")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};