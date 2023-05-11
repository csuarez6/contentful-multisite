import { NextRequest, NextResponse } from 'next/server';

import { getToken } from "next-auth/jwt";
// paths that require authentication or authorization
const [AUTH_USER, AUTH_PASS] = (process.env.HTTP_BASIC_AUTH || ':').split(':');
const enviroment = process.env.NODE_ENV;
const checkAuth: string[] = ["/acceso", "/forgotpassword", "/registro"];
export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: 'secret',
  });
  console.info("********** middleware: ", token);
  console.log("********** enviroment: ", enviroment);
  const pathname = request.nextUrl.pathname;

  // Check access - Enviroment
  if (enviroment == "development" || enviroment == "test") {
    if (!isAuthenticated(request)) {
      // return new NextResponse('Authentication required', {
      //   status: 401,
      //   headers: { 'WWW-Authenticate': 'Basic' },
      // });
    }
  }
  // *************************

  // Check User Session
  if (token) {
    // validate your session here
    console.info("********** Middleware Response: User Session Actived");
    if (checkAuth.some((path) => pathname.startsWith(path))) {
      const urlTmp = request.nextUrl.clone();
      urlTmp.pathname = `/`;
      return NextResponse.redirect(urlTmp);
    } else {
      return NextResponse.next();
    }
  } else {
    // the user is not logged in, redirect to the sign-in page
    console.info("********** Middleware Response: No User Session");
    const requestedPage = request.nextUrl.pathname;
    console.log({ requestedPage });
    const url = request.nextUrl.clone();
    url.pathname = `/acceso`;
    url.search = `p=${requestedPage}`;
    if (!checkAuth.some((path) => pathname.startsWith(path))) {
      return NextResponse.redirect(url);
    }
  }
  // **************************
}

function isAuthenticated(req: NextRequest) {
  const authheader = req.headers.get('authorization') || req.headers.get('Authorization');

  if (!authheader) {
    return false;
  }

  const auth = Buffer.from(authheader.split(' ')[1], 'base64').toString().split(':');
  const user = auth[0];
  const pass = auth[1];

  // if (user == AUTH_USER && pass == AUTH_PASS) {
  if (user == "andres" && pass == "local123") {
    return true;
  } else {
    return false;
  }
}

// // See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard/:path*', '/acceso', '/forgotpassword', '/registro']
};
// ***********
