import type { NextApiRequest, NextApiResponse } from 'next';

import getFilteredContent from '@/lib/services/content-filter.service';
import { FACET_QUERY_MAP } from '@/constants/search.constants';

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse<any>
) => {
  const filters = {};
  for (const fk in FACET_QUERY_MAP) {
    if (request?.query[FACET_QUERY_MAP[fk].inputName]) {
      filters[FACET_QUERY_MAP[fk].inputName] = typeof request.query[FACET_QUERY_MAP[fk].inputName] == 'string'
        ? request.query[FACET_QUERY_MAP[fk].inputName]
        : request.query[FACET_QUERY_MAP[fk].inputName][0];
    }
  }

  const filteredContent = await getFilteredContent({
    fullTextSearch: typeof request.query.text == 'string' ? request.query.text : (request?.query?.text?.[0] ?? ''),
    pageResults: request.query.pageResults,
    contentTypesFilter: typeof request.query.type == 'string' ? [request.query.type] : request.query.type,
    parentIds: typeof request.query.parent == 'string' ? [request.query.parent] : request.query.parent,
    page: typeof request.query.page == 'string' ? parseInt(request.query.page) : parseInt(request.query.page[0]),
    filters
  });

  response.setHeader('Vercel-CDN-Cache-Control', 'public, max-age=600');
  response.setHeader('CDN-Cache-Control', 'no-store, must-revalidate');
  response.setHeader('Cache-Control', 'no-store, must-revalidate');
  
  response.status(200).json(filteredContent);
};

export default handler;
