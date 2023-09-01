import type { NextApiRequest, NextApiResponse } from 'next';
import { getOrderStatusCl } from '@/lib/services/commerce-layer.service';
import { getP2PRequestInformation } from '@/lib/services/place-to-pay.service';

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<any>
) => {
    // if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    try {
        const resp = await getOrderStatusCl();
        const orderData = resp.data ?? [];
        orderData.forEach(function () {
            const infoP2P = getP2PRequestInformation("2392499");
            console.info({ infoP2P });
        });
        return res.status(200).json({ recordsNumber: orderData.length, crossRecords: 0 });
    } catch (e) {
        return res.status(500).json({ status: 'error', message: e.message });
    }
};

export default handler;