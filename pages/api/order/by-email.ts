import type { NextApiRequest, NextApiResponse } from 'next';
import { getOrdersByEmail } from '@/lib/services/commerce-layer.service';

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<any>
) => {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    try {
        const { customerEmail } = req.body;
        const resp = await getOrdersByEmail(customerEmail);
        return res.status(200).json({ ...resp });
    } catch (e) {
        return res.status(500).json({ status: 'error', message: e.message });
    }
};

export default handler;
