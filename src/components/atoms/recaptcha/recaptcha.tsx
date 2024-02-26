import { ReCaptcha, ReCaptchaProvider } from "next-recaptcha-v3";
import { useEffect, useState } from "react";
// import ReCAPTCHA from "react-google-recaptcha";

export interface IReCaptcha {
  version?: string | number;
  handleChange?: (token: string) => void;
  classNames?: string;
}

const showCaptcha = (attr) => {
  const elGrecaptcha = document.querySelector<HTMLElement>(".grecaptcha-badge");
  if (elGrecaptcha) elGrecaptcha.style.display = attr;
};

const ReCaptchaBox: React.FC<IReCaptcha> = ({
  version,
  handleChange,
}) => {
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    if (version == "2") return;
    // Component mounted
    showCaptcha("block");

    return () => {
      // Component Unmounted
      showCaptcha("none");

      // window.grecaptcha = null;
      // if (window.grecaptcha) {
      //   showCaptcha("none");
      // }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (token) {
      handleChange(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <ReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY_V3}
    >
      <ReCaptcha onValidate={setToken} action="form_submit" />
    </ReCaptchaProvider>
  );
};

export default ReCaptchaBox;
