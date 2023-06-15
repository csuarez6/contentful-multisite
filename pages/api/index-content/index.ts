import type { NextApiRequest, NextApiResponse } from 'next';

import { getAlgoliaSearchIndex } from '@/lib/services/content-filter.service';
import getEntryContent from '@/lib/services/entry-content.service';
import { getCommercelayerProduct } from '@/lib/services/commerce-layer.service';
import _ from 'lodash';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  if (req.method !== 'PUT' && req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const index = await getAlgoliaSearchIndex(
      req.headers['x-algolia-application-id'],
      req.headers['x-algolia-api-key']
    );
    // console.log('index', req.body);
    let entryData = typeof req.body == 'string' ? JSON.parse(req.body) : { ...req.body };
    const indexType = _.upperFirst(entryData.sys.contentType.sys.id).replaceAll('_', '');
    
    if (req.method === 'DELETE') {
      const { taskID } = await index.deleteObject(entryData.sys.id);
      return res.status(200).json({
        deletedAt: new Date().toISOString(),
        taskID,
        objectID: entryData.sys.id,
      });
    }

    let entryFields = await getEntryContent({
      __typename: indexType,
      sys: {
        id: entryData.sys.id
      }
    }, false, true, 3);

    if (!entryFields) {
      return res.status(404).json({ status: 'error', message: 'Content not found' });
    }

    if (indexType === 'Product') {
      const productPrices = await getCommercelayerProduct(entryFields.sku);
      if (productPrices) {
        entryFields = {
          ...entryFields,
          ...productPrices
        };
      }
    }

    entryData = {
      ...entryData,
      fields: entryFields,
      objectID: entryData.sys.id,
    };
    const { taskID, objectID } = await index.saveObject(entryData);

    return res.status(200).json({
      updatedAt: new Date().toISOString(),
      taskID,
      objectID,
    });
  } catch (e) {
    return res.status(500).json({ status: 'error', message: e.message });
  }
};

export default handler;
