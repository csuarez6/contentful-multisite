import axios from "axios";

export const validate = async (tokenResponse: string, version?: number): Promise<boolean> => {
  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY_V3;
    // if (version && version == 2) secretKey = process.env.RECAPTCHA_SECRET_KEY_V2;
    const result = await axios<{ success: boolean, score?: number, action?: string }>(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${tokenResponse}`
    );

    if (version && version == 2) {
      return result.data?.success;
    } else {
      const success = result.data?.success && result.data?.score >= 0.6 && result.data?.action == "form_submit";
      return success;
    }

  } catch (error) {
    console.error(new Error("RE_CAPTCHA_VALIDATION_ERROR", { cause: error }));
    return false;
  }
};

const ReCaptchaService = {
  validate
};

export default ReCaptchaService;
