import type { NextApiRequest, NextApiResponse } from 'next';

import { getAlgoliaSearchIndex } from '@/lib/services/content-filter.service';

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse<any>
) => {
  const { sku } = request.query;
  const skuString = typeof sku == 'string' ? sku : sku[0];

  const indexSearch = getAlgoliaSearchIndex(
    process.env.ALGOLIASEARCH_APP_ID,
    process.env.ALGOLIASEARCH_READ_API_KEY,
    process.env.ALGOLIASEARCH_INDEX
  );

  const resultAlgolia: any = await indexSearch.search('', {
    filters: `sys.contentType.sys.id:"product" AND fields.sku:"${skuString}"`,
    hitsPerPage: 1,
    attributesToRetrieve: ['fields'],
  });

  if (resultAlgolia.nbHits === 1 && resultAlgolia?.hits?.[0]?.fields) {
    response.setHeader('Vercel-CDN-Cache-Control', 'public, max-age=10800');
    response.setHeader('CDN-Cache-Control', 'public, max-age=0');
    response.setHeader('Cache-Control', 'public, max-age=0');
    return response.status(200).json(resultAlgolia.hits[0].fields);
  }

  return response.status(404).json({
    code: 404,
    message: `Product with SKU "${skuString}" not found`
  });
};

export default handler;
