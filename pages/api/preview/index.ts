import { NextApiRequest, NextApiResponse } from 'next';

import getPageContent from '@/lib/services/page-content.service';

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const { path } = req.query;
  const entry = await getPageContent((path as string), true, false);

  if (!entry) {
    return res.status(401).json({ message: 'Invalid urlPath' });
  }

  res.setPreviewData({
    maxAge: 60 * 60
  });

  res.writeHead(307, { Location: (path as string) });
  res.end();
};

export default handle;
