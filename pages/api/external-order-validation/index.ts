import type { NextApiRequest, NextApiResponse } from 'next';
import reCaptchaService from '@/lib/services/re-captcha.service';

const orderValidation = async ({ body, method }: NextApiRequest, res: NextApiResponse) => {
    if (method !== "POST") return res.status(404).json({ mesagge: " Error 404 resource not found" });

    const { data: { attributes }, included } = body;

    const reCaptchaResponse = attributes?.metadata?.recapchaResponse;
    const isValidReCaptcha = await reCaptchaService.validate(reCaptchaResponse);

    if (!isValidReCaptcha) {
        return res.status(400).json({
            success: false,
            data: {
                recaptcha: "ReCaptcha validation error",
            },
            error: {
                code: "RE_CAPTCHA_ERROR_VALIDATION",
                message: "ReCaptcha validation error",
            },
        });
    }
    const vantiListoMarket = included?.find((el: any) => el.id === process.env.NEXT_PUBLIC_VANTI_LISTO_MARKET_ID);

    if (vantiListoMarket) {
        res.status(400).json({
            success: false,
            data: {
                included: "Invalid VantiListo Market",
            },
            error: {
                code: "Error 400",
                message: "Invalid VantiListo Market"
            }
        });
    }
    res.json({ success: true, data: {} });
    return; 
};

export default orderValidation;