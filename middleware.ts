import { NextRequest, NextResponse } from 'next/server';

import { getToken } from "next-auth/jwt";
// paths that require authentication or authorization
const [AUTH_USER, AUTH_PASS] = (process.env.HTTP_BASIC_AUTH || ':').split(':');
const enviroment = process.env.NODE_ENV;
const checkAuth: string[] = ["/acceso", "/forgotpassword", "/registro"];
export async function middleware(request: NextRequest) {
  let response = null;
  const token = await getToken({
    req: request,
    secret: 'secret',
  });
  console.info("********** middleware: ", token);
  console.info("********** enviroment: ", enviroment);
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
      response = NextResponse.redirect(urlTmp);
    } else {
      response = NextResponse.next();
    }
  } else {
    // the user is not logged in, redirect to the sign-in page
    console.info("********** Middleware Response: No User Session");
    const requestedPage = request.nextUrl.pathname;
    const url = request.nextUrl.clone();
    url.pathname = `/acceso`;
    url.search = `p=${requestedPage}`;
    if (!checkAuth.some((path) => pathname.startsWith(path))) {
      response = NextResponse.redirect(url);
    }
  }
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'nonce-${nonce}';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
  `
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set(
    'Content-Security-Policy',
    // Replace newline characters and spaces
    cspHeader.replace(/\s{2,}/g, ' ').trim()
  );
  return response;
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
