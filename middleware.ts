import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { getSession } from 'next-auth/react';

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const requestForNextAuth = {
    headers: {
      cookie: req.headers.get('cookie'),
      IncomingMessage: '',
    },
  };

  const session = await getSession({ req: requestForNextAuth });

  if (session) {
    // validate your session here
    console.log("********** Middleware Response: User Session Actived");
    return NextResponse.next();
  } else {
    // the user is not logged in, redirect to the sign-in page
    console.log("********** Middleware Response: No User Session");
    const requestedPage = req.nextUrl.pathname;
    const url = req.nextUrl.clone();
    url.pathname = `/acceso`;
    url.search = `p=${requestedPage}`;
    return NextResponse.redirect(url);
  }
};

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/checkout/verify', '/registro']
};
