import React from 'react';
import { render } from '@testing-library/react';
import LineSteps from './LineSteps';
import { data } from './LineSteps.mock'

describe('LineStepsBlock', () => {

    test('renders', () => {
        render(<LineSteps {...data} />);

    });

})