import React from 'react';
import { render } from '@testing-library/react';
import SignUpFormBlock from './SignUpFormBlock';
import { mockSignUpFormBlockProps } from './SignUpFormBlock.mocks'

describe('SignUpFormBlockBlock', () => {

    test('renders', () => {
        render(<SignUpFormBlock {...mockSignUpFormBlockProps.data} />);

    });

})