import CryptoJS, { HmacSHA256 } from 'crypto-js';
import { NextApiRequest } from "next";
import getRawBody from 'raw-body';

const paymentGatewayValidation = async (
    req: NextApiRequest,
) => {
    if (req.method !== "POST") throw new Error("NOT_FOUND");

    try {
        const signature = req.headers['x-commercelayer-signature'];
        console.info('signature', signature);
        const rawBody = await getRawBody(req);
        const hash = HmacSHA256(JSON.stringify(rawBody), process.env.COMMERCELAYER_P2P_SHARED_SECRET);
        const encode = hash.toString(CryptoJS.enc.Base64);
        console.info('encode', encode);

        if (signature !== encode) throw new Error("INVALID_SIGNATURE");
    } catch (error) {
        console.error(error);
    }
};

export default paymentGatewayValidation;