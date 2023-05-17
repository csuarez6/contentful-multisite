import React from 'react';
import { render } from '@testing-library/react';
import InquiryForm from './InquiryForm';
import { mockInquiryFormsProps } from './InquiryForm.mocks'

describe('InquiryFormBlock', () => {

    test('renders', () => {
        render(<InquiryForm {...mockInquiryFormsProps.dataRPO} />);

    });

})

describe('InquiryFormBlock dataVantilisto', () => {

    test('renders', () => {
        render(<InquiryForm {...mockInquiryFormsProps.dataVantilisto} />);

    });

})