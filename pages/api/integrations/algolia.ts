import { getAlgoliaSearchIndex } from '@/lib/services/content-filter.service';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<any>
) => {
    if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

    try {
        const indexSearch = getAlgoliaSearchIndex(
            process.env.ALGOLIASEARCH_APP_ID,
            process.env.ALGOLIASEARCH_READ_API_KEY,
            process.env.ALGOLIASEARCH_INDEX
        ); 
        
        if(!indexSearch){
            return res.status(200).json({status: 500, data: 'commerceLayer offline'});
        }
        return res.status(200).json({ status: 200, data: 'commerceLayer online '});
    } catch (e) {
        return res.status(500).json({ status: 'error commerceLayer offline', message: e.message });
    }
};

export default handler;
