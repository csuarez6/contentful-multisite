import { getAlgoliaSearchIndex } from '@/lib/services/content-filter.service';
import type { NextApiRequest, NextApiResponse } from 'next';
import { redirect } from 'next/dist/server/api-utils';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const { sku } = req.query;
  const skuString = typeof sku == 'string' ? sku : sku[0];

  const indexSearch = getAlgoliaSearchIndex(
    process.env.ALGOLIASEARCH_APP_ID,
    process.env.ALGOLIASEARCH_READ_API_KEY
  );

  const resultAlgolia: any = await indexSearch.search('', {
    filters: `sys.contentType.sys.id:"product" AND fields.sku:"${skuString}"`,
    hitsPerPage: 1,
    attributesToRetrieve: ['fields'],
  });

  if (resultAlgolia.nbHits === 1 && resultAlgolia?.hits?.[0]?.fields) {
    redirect(res, resultAlgolia.hits[0].fields.urlPath);
  }

  redirect(res, '/');
};

export default handler;
