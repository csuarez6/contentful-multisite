import { NextRequest, NextResponse } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';

import { getToken } from "next-auth/jwt";
// paths that require authentication or authorization
const [AUTH_USER, AUTH_PASS] = (process.env.HTTP_BASIC_AUTH || ':').split(':');
const enviroment = process.env.NODE_ENV;
// const checkAuth: string[] = ["/acceso", "/forgotpassword", "/registro"];
const checkAuth: string[] = ["/blocked"];
const ALLOWED_IPS = [
  '103.21.244.0/22',
  '103.22.200.0/22',
  '103.31.4.0/22',
  '104.16.0.0/13',
  '104.24.0.0/14',
  '108.162.192.0/18',
  '131.0.72.0/22',
  '141.101.64.0/18',
  '162.158.0.0/15',
  '172.64.0.0/13',
  '173.245.48.0/20',
  '188.114.96.0/20',
  '190.93.240.0/20',
  '197.234.240.0/22',
  '198.41.128.0/17',
]; // replace with your IPs
export async function middleware(request: NextRequest, res: NextApiResponse, req: NextApiRequest) {
  let response = null;
  const token = await getToken({
    req: request,
    secret: 'secret',
  });
  console.info("********** middleware: ", token);
  console.info("********** enviroment: ", enviroment);
  const pathname = request.nextUrl.pathname;
  // Log request
  console.log({ request });

  const userIP = request.ip ?? request.headers.get("x-forwarded-for");
  console.log({ userIP });

  const IpValidate = ALLOWED_IPS.some(function (item) {
    const rangeIp = getIpRangeFromAddressAndNetmask(item);
    const validate = verifyIp(rangeIp[0], rangeIp[1], userIP);
    if (validate) console.log({ rangeIp });
    return validate === true;
  });

  console.log({ IpValidate });
  // Check if the user's IP is not allowed
  if (!IpValidate) {
    // block access
    const res = new NextResponse(null, { status: 403 })
    res.headers.set("x-middleware-refresh", "1")
    return res;
  }

  // // Check User Session
  // if (token) {
  //   // validate your session here
  //   console.info("********** Middleware Response: User Session Actived");
  //   if (checkAuth.some((path) => pathname.startsWith(path))) {
  //     const urlTmp = request.nextUrl.clone();
  //     urlTmp.pathname = `/`;
  //     return NextResponse.redirect(urlTmp);
  //   } else {
  //     return NextResponse.next();
  //   }
  // } else {
  //   // the user is not logged in, redirect to the sign-in page
  //   console.info("********** Middleware Response: No User Session");
  //   const requestedPage = request.nextUrl.pathname;
  //   const url = request.nextUrl.clone();
  //   url.pathname = `/acceso`;
  //   url.search = `p=${requestedPage}`;
  //   if (!checkAuth.some((path) => pathname.startsWith(path))) {
  //     // response = NextResponse.redirect(url);
  //     return NextResponse.redirect(url);
  //   }
  // }

  // return response;
  // **************************
}

function ipToInt32(ip: any) {
  return ip?.split(".").reduce((int: number, v: string | number) => int * 256 + +v);
}

function verifyIp(ipStart: any, ipEnd: any, ip: any) {
  return (ipToInt32(ip) >= ipToInt32(ipStart) && ipToInt32(ip) <= ipToInt32(ipEnd));
}

function getIpRangeFromAddressAndNetmask(str) {
  const part = str?.split("/"); // part[0] = base address, part[1] = netmask
  const ipaddress = part[0]?.split('.');
  let netmaskblocks: any = ["0", "0", "0", "0"];
  if (!/\d+\.\d+\.\d+\.\d+/.test(part[1])) {
    // part[1] has to be between 0 and 32
    netmaskblocks = ("1".repeat(parseInt(part[1], 10)) + "0".repeat(32 - parseInt(part[1], 10))).match(/.{1,8}/g);
    netmaskblocks = netmaskblocks?.map(function (el) { return parseInt(el, 2); });
  } else {
    // xxx.xxx.xxx.xxx
    netmaskblocks = part[1]?.split('.').map(function (el) { return parseInt(el, 10) });
  }
  // invert for creating broadcast address (highest address)
  const invertedNetmaskblocks = netmaskblocks?.map(function (el) { return el ^ 255; });
  const baseAddress = ipaddress?.map(function (block, idx) { return block & netmaskblocks[idx]; });
  const broadcastaddress = baseAddress?.map(function (block, idx) { return block | invertedNetmaskblocks[idx]; });
  return [baseAddress?.join('.'), broadcastaddress?.join('.')];
}

// // See "Matching Paths" below to learn more
export const config = {
  matcher: ['/:path*']
};
// matcher: ['/dashboard/:path*', '/acceso', '/forgotpassword', '/registro', '/']
// ***********
