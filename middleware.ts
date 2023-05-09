import { NextRequest, NextResponse } from 'next/server';

import { getToken } from "next-auth/jwt";
// export { default } from "next-auth/middleware";
// paths that require authentication or authorization
// const [AUTH_USER, AUTH_PASS] = (process.env.HTTP_BASIC_AUTH || ':').split(':');
const checkAuth: string[] = ["/acceso", "/forgotpassword", "/registro"];
export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: 'secret',
  });
  console.info("********** middleware: ", token);
  const pathname = request.nextUrl.pathname;
  if (token) {
    // validate your session here
    console.info("********** Middleware Response: User Session Actived");
    if (checkAuth.some((path) => pathname.startsWith(path))) {
      const url = request.nextUrl.clone();
      url.pathname = `/`;
      return NextResponse.rewrite(url);
    }

    return NextResponse.next();
  } else {
    // the user is not logged in, redirect to the sign-in page
    console.info("********** Middleware Response: No User Session");
    const requestedPage = request.nextUrl.pathname;
    const url = request.nextUrl.clone();
    url.pathname = `/acceso`;
    url.search = `p=${requestedPage}`;
    if (!checkAuth.some((path) => pathname.startsWith(path))) {
      return NextResponse.redirect(url);
    }
  }
}

// // See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard/:path*', '/acceso', '/forgotpassword', '/registro']
};
