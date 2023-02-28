import axios from "axios";

export const validate = async (tokenResponse: string): Promise<boolean> => {
  try {
    const result = await axios<{ success: boolean }>(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${tokenResponse}`
    );
    
    return result.data?.success;
  } catch (error) {
    console.error(new Error("RE_CAPTCHA_VALIDATION_ERROR", { cause: error }));
    return false;
  }
};

const ReCaptchaService = {
  validate
};

export default ReCaptchaService;
