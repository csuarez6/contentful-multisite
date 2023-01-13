import React from 'react';
import { ICustomLink } from './CustomLink';

const data: ICustomLink = {
  children: React.createElement('span', { className: 'text-white' }, 'My link example'),
  content: {
    externalLink: '+573101238737',
  },
  className: 'button button-secondary'
};

export const mockCustomLinkProps = {
  data,
};
