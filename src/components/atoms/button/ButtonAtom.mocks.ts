import { IButtonAtom } from './ButtonAtom';

const dataLink: IButtonAtom = {
  text: 'Link',
  type: 'link',
  classes: 'button-primary',
  link: {
    href: '#',
    target: '_blank'
  }
};

const dataButton: IButtonAtom = {
  text: 'Button',
  type: 'button',
  classes: 'button-secondary',
  callbackAction: () => { alert('Dispatch from stories'); }
};

const dataModal: IButtonAtom = {
  text: 'Modal',
  type: 'Modal',
  classes: 'button-secondary',
  children: "Contenido del modal de prueba"
};

export const mockButtonAtomProps = {
  dataLink,
  dataButton,
  dataModal
};
