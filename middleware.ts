import { NextRequest, NextResponse } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';

const enviromentVercel = process.env.NEXT_PUBLIC_VERCEL_ENV;
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
];

export async function middleware(request: NextRequest, _res: NextApiResponse, _req: NextApiRequest) {
  const userIP = request.ip ?? request.headers.get("x-forwarded-for");
  const IpValidate = ALLOWED_IPS.some(function (item) {
    const rangeIp = getIpRangeFromAddressAndNetmask(item);
    const validate = verifyIp(rangeIp[0], rangeIp[1], userIP);
    return validate === true;
  });

  if (!IpValidate && (enviromentVercel === "production" || enviromentVercel === "qualitycontrol")) {
    const res = new NextResponse(null, { status: 403 });
    res.headers.set("x-middleware-refresh", "1");
    return res;
  }
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
    netmaskblocks = ("1".repeat(parseInt(part[1], 10)) + "0".repeat(32 - parseInt(part[1], 10))).match(/.{1,8}/g);
    netmaskblocks = netmaskblocks?.map(function (el: any) { return parseInt(el, 2); });
  } else {
    netmaskblocks = part[1]?.split('.').map(function (el: any) { return parseInt(el, 10); });
  }
  const invertedNetmaskblocks = netmaskblocks?.map(function (el: any) { return el ^ 255; });
  const baseAddress = ipaddress?.map(function (block: any, idx: any) { return block & netmaskblocks[idx]; });
  const broadcastaddress = baseAddress?.map(function (block: any, idx: any) { return block | invertedNetmaskblocks[idx]; });
  return [baseAddress?.join('.'), broadcastaddress?.join('.')];
}

export const config = {
  matcher: ['/:path*']
};
