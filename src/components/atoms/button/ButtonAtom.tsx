import React, { useState } from 'react';
import CustomModal from '@/components/organisms/custom-modal/CustomModal';
import { classNames } from '@/utils/functions';

interface ITypeLink {
  href: string;
  target?: string;
}

export interface IButtonAtom {
  text: string;
  type: string;
  classes?: string;
  modalClass?: string;
  link?: ITypeLink;
  children?: React.ReactNode;
  callbackAction?: (event) => void;
}

const ButtonAtom: React.FC<IButtonAtom> = ({
  text,
  type,
  classes,
  modalClass,
  link,
  callbackAction,
  children
}) => {
  let component = null;

  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const handlerClicked = (event) => {
    if (type === "Modal") {
      setOpen(true);
    } else if (callbackAction) {
      callbackAction(event);
    }
  };

  if (type === "link") {
    component = (
      <a
        className={classNames("button", classes ?? "text-button")}
        href={link.href}
        target={link.target}
      >
        {text}
      </a>
    );
  } else {
    component = (
      <>
        <button
          className={classNames("button", classes ?? "text-button")}
          onClick={(event) => handlerClicked(event)}
        >
          {text ?? "Botón"}
        </button>
        {(type === "Modal") && open && (
          <CustomModal close={closeModal} containerClass={modalClass}>
            {children}
          </CustomModal>
        )}
      </>
    );
  }

  return <>{component}</>;
};

export default ButtonAtom;
