import React from 'react';
import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import AccordionBlock from './AccordionBlock';
import { data } from './AccordionBlock.mock'

describe('AccordionBlock', () => {
    test('renders', async () => {
        render(<AccordionBlock {...data} />);
    });
})