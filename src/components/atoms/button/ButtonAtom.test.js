import { act, render, screen, fireEvent } from '@testing-library/react';
import { mockButtonAtomProps } from './ButtonAtom.mocks';
import ButtonAtom from './ButtonAtom.tsx';
import '@testing-library/jest-dom';

mockButtonAtomProps.dataButton.callbackAction = () => {console.warn('Dispatch from stories')};

describe('ButtonAtom Base', () => {;
  it('renders', async () => {;
    render(<ButtonAtom {...mockButtonAtomProps.dataLink}/>);
    await act(async () => {;
      const button = await screen.getByTestId('button-atom');
      fireEvent.click(button);
    });
  });
});

describe('ButtonAtom Button', () => {;
  it('renders', async () => {;
    render(<ButtonAtom {...mockButtonAtomProps.dataButton}/>);
    await act(async () => {;
      const button = await screen.getByTestId('button-atom');
      fireEvent.click(button);
    });
  });
});

describe('ButtonAtom Modal', () => {;
  it('renders', async () => {;
    render(<ButtonAtom {...mockButtonAtomProps.dataModal}/>);
    await act(async () => {;
      const button = await screen.getByTestId('button-atom');
      fireEvent.click(button);
    });
  });
});