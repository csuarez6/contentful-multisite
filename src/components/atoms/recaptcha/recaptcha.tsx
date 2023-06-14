import { ReCaptcha, ReCaptchaProvider } from "next-recaptcha-v3";
import { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

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
  classNames,
}) => {
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    // Component mounted
    showCaptcha("block");
    // const interval = setInterval(() => {
    //   console.info("ReCaptcha");
    // }, 1000);

    // return () => {
    //   // Component Unmounted
    //   clearInterval(interval);
    //   window.grecaptcha = null;
    //   if (window.grecaptcha) {
    //     showCaptcha("none");
    //   }
    // };
  }, []);

  useEffect(() => {
    if (token) {
      handleChange(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  if (version && version == "2") {
    return (
      <ReCAPTCHA
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY_V2}
        onChange={(e) => handleChange(e)}
        className={classNames}
      />
    );
  } else {
    return (
      <ReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY_V3}
      >
        <ReCaptcha onValidate={setToken} action="form_submit" />
      </ReCaptchaProvider>
    );
  }
};

export default ReCaptchaBox;
