// middleware.ts
import { NextResponse } from 'next/server';
import { auth } from '@/lib/firebase';

export async function middleware(request: any) {
  const user = auth.currentUser;

  if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'], // Protect all routes under /dashboard
};