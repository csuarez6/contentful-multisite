import type { NextApiRequest, NextApiResponse } from 'next';

import getFilteredContent from '@/lib/services/content-filter.service';
import { FACET_QUERY_MAP } from '@/constants/search.constants';
import getCollectionContent from '@/lib/services/collection-content.service';
import { CONTENTFUL_TYPENAMES } from '@/constants/contentful-typenames.constants';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const filters = {};
  for (const fk in FACET_QUERY_MAP) {
    if (req?.query[FACET_QUERY_MAP[fk].inputName]) {
      filters[FACET_QUERY_MAP[fk].inputName] = typeof req.query[FACET_QUERY_MAP[fk].inputName] == 'string'
        ? [req.query[FACET_QUERY_MAP[fk].inputName]]
        : req.query[FACET_QUERY_MAP[fk].inputName];
    }
  }

  const filteredContent = await getFilteredContent({
    contentTypesFilter: typeof req.query.type == 'string' ? [req.query.type] : req.query.type,
    parentIds: typeof req.query.parent == 'string' ? [req.query.parent] : req.query.parent,
    availableFacets: typeof req.query.facets == 'string' ? [req.query.facets] : req.query.facets,
    filters
  });

  // if (req?.query?.mainFacet) {
  //   const mainFacet = typeof req.query.mainFacet == 'string' ? req.query.mainFacet : req.query.mainFacet[0];
  //   const mainFacetIndex = filteredContent.facets.findIndex(f => f.labelSelect === mainFacet);

  //   const mainFacetContents = await getCollectionContent({
  //     __typename: (mainFacet === 'Marca'
  //       ? CONTENTFUL_TYPENAMES.TRADEMARK
  //       : CONTENTFUL_TYPENAMES.PRODUCT_CATEGORY
  //     )
  //   }, '', false);

  //   filteredContent.facets[mainFacetIndex].listedContents = mainFacetContents.map(c => {
  //     return {
  //       ...c,
  //       text: c.name,
  //       value: c.name,
  //       totalItems: 0,
  //     };
  //   });
  // }

  res.status(200).json(filteredContent);
};

export default handler;
