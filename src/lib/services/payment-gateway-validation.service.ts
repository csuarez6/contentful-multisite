import CryptoJS, { HmacSHA256 } from 'crypto-js';
import { NextApiRequest } from "next";

const paymentGatewayValidation = (
    req: NextApiRequest,
) => {
    if (req.method !== "POST") throw new Error("NOT_FOUND");

    try {
        const signature = req.headers['x-commercelayer-signature'];
        console.info('signature', signature);
        const hash = HmacSHA256(JSON.stringify(req.body), process.env.COMMERCELAYER_P2P_SHARED_SECRET);
        const encode = hash.toString(CryptoJS.enc.Base64);
        console.info('encode', encode);

        if (signature !== encode) throw new Error("INVALID_SIGNATURE");
    } catch (error) {
        console.error(error);
    }
};

export default paymentGatewayValidation;