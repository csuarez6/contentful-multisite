import type { NextApiRequest, NextApiResponse } from 'next';

import getFilteredContent from '@/lib/services/content-filter.service';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const filteredContent = await getFilteredContent({
    contentTypesFilter: typeof req.query.type == 'string' ? [req.query.type] : req.query.type,
    parentIds: typeof req.query.parent == 'string' ? [req.query.parent] : req.query.parent,
    availableFacets: typeof req.query.facets == 'string' ? [req.query.facets] : req.query.facets,
  });

  res.status(200).json(filteredContent);
};

export default handler;
