import "@/styles/button.css";

interface ITypeLink {
  href: string,
  target?: string
}

export interface IButtonAtom {
  text: string,
  type: string,
  classes?: string,
  link?: ITypeLink,
  callbackAction?: (event) => void
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const ButtonAtom: React.FC<IButtonAtom> = ({ text, type, classes, link, callbackAction }) => {
  let loginButton;
  if (type === 'link') {
    loginButton = <a className={classNames(
                      "button",
                      classes ?? 'text-button',
                    )}
                    href={link.href}
                    target={link.target}
                  >
                    { text }
                  </a>;
  } else {
    loginButton = <button className={classNames(
                      "button",
                      classes ?? 'text-button',
                    )}
                    onClick={(event) => callbackAction(event)}
                  >
                    { text }
                  </button>;
  }

  return (
    <>
      {loginButton}
    </>
  );
};

export default ButtonAtom;
