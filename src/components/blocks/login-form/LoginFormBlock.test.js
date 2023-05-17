import React from 'react';
import { render } from '@testing-library/react';
import LoginFormBlock from './LoginFormBlock';
import { mockLoginFormBlockProps } from './LoginFormBlock.mocks'

describe('LoginFormBlockBlock', () => {

    test('renders', () => {
        render(<LoginFormBlock {...mockLoginFormBlockProps.data} />);

    });

})
