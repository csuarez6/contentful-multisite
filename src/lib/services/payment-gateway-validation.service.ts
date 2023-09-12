import CryptoJS, { HmacSHA256 } from 'crypto-js';
import { NextApiRequest } from "next";

const paymentGatewayValidation = async (
    req: NextApiRequest,
    rawBody: string
) => {
    if (req.method !== "POST") throw new Error("NOT_FOUND");

    const signature = req.headers['x-commercelayer-signature'];
    const hash = HmacSHA256(rawBody, process.env.COMMERCELAYER_P2P_SHARED_SECRET);
    const encode = hash.toString(CryptoJS.enc.Base64);

    if (signature !== encode) throw new Error("INVALID_SIGNATURE");
};

export default paymentGatewayValidation;