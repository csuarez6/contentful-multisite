import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<any>
) => {
    if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

    try {
       
        return res.status(200).json({ status: 200, data: 'esta funcionando'});
    } catch (e) {
        return res.status(500).json({ status: 'error', message: e.message });
    }
};

export default handler;
