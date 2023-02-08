import { NextRequest, NextResponse } from 'next/server';

import { getToken } from "next-auth/jwt";
// paths that require authentication or authorization
// const requireAuth: string[] = ["/registro"];
export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: 'secret',
  });
  console.log("********** middleware: ", token);
  if (token) {
    // validate your session here
    console.log("********** Middleware Response: User Session Actived");
    return NextResponse.next();
  } else {
    // the user is not logged in, redirect to the sign-in page
    console.log("********** Middleware Response: No User Session");
    const requestedPage = request.nextUrl.pathname;
    const url = request.nextUrl.clone();
    url.pathname = `/acceso`;
    url.search = `p=${requestedPage}`;
    return NextResponse.redirect(url);
  }
  // if (requireAuth.some((path) => pathname.startsWith(path))) {
  //   //check role
  //   if (token.role !== "admin") {
  //     const url = new URL(`/403`, request.url);
  //     return NextResponse.rewrite(url);
  //   }
  // }
}

// // See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard']
};
