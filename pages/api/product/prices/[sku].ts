import type { NextApiRequest, NextApiResponse } from 'next';

import { getCommercelayerProduct } from '@/lib/services/commerce-layer.service';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const { sku } = req.query;
  const productPrices = await getCommercelayerProduct(typeof sku == 'string' ? sku : sku[0]);

  return res.status(200).json(productPrices);
};

export default handler;
