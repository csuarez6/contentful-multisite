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
  callbackAction: (event) => { alert('dispatch from stories'); console.log('event', event); }
};

export const mockButtonAtomProps = {
  dataLink,
  dataButton
};
