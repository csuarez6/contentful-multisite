import { NextApiRequest, NextApiResponse } from 'next';

const handle = (req: NextApiRequest, res: NextApiResponse) => {
    res.clearPreviewData();

    res.writeHead(307, { Location: req.headers.referer || '/' });
    res.end();
};

export default handle;
