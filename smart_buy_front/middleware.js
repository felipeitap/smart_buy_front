import { NextResponse } from "next/server";
import { cookies } from 'next/headers'

const publicRoutes = ["/signup", "/"];

export default async function middleware(req) {
  const path = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = (await cookies()).get('session')?.value
    
  console.log(cookie);
  



  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
