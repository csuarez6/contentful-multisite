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
  callbackAction: (_event) => { alert('Dispatch from stories'); }
};

export const mockButtonAtomProps = {
  dataLink,
  dataButton
};
