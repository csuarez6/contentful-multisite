import type { NextApiRequest, NextApiResponse } from 'next';
import { updateOrderAdminService } from '@/lib/services/commerce-layer.service';
import { QueryParamsRetrieve } from '@commercelayer/sdk';
import { formatPrice, generateAmountCents } from '@/utils/functions';

const DEFAULT_ORDER_PARAMS_ALLY: QueryParamsRetrieve = {
    include: ["line_items", "line_items.item", "line_items.item.shipping_category", "customer"],
    fields: {
        orders: [
            "status",
            "line_items",
            "customer",
            "metadata",
            "customer_email"
        ],
        line_items: [
            "item_type",
            "image_url",
            "name",
            "sku_code",
            "quantity",
            "formatted_unit_amount",
            "formatted_total_amount",
            "unit_amount_cents",
            "total_amount_cents",
            "total_amount_float",
            "item"
        ]
    }
};

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<any>
) => {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    try {
        const { idOrder } = req.body;
        const resp : any = await updateOrderAdminService(idOrder, DEFAULT_ORDER_PARAMS_ALLY, false);

        const allies = [];
        resp?.data?.line_items?.forEach((line_item: any) => {
            let targetIndex = allies.findIndex((value: any) => value.id === line_item.item.shipping_category.id);
            if(targetIndex === -1){
                allies.push({ ...line_item.item.shipping_category });
                targetIndex = allies.length - 1;
            }
            if(!(allies[targetIndex]?.line_items)) allies[targetIndex].line_items = [];
            delete line_item?.item?.shipping_category;
            allies[targetIndex].line_items.push({ ...line_item });
        });

        allies.map((ally: any) => {
            const ally_total_amount_float = generateAmountCents(ally?.line_items).reduce((acum, current) => acum + current.product_amount_float ?? 0, 0);
            ally.ally_total_amount_float = ally_total_amount_float;
            ally.formatted_ally_total_amount = formatPrice(ally_total_amount_float);
        });

        delete resp?.data?.line_items;
        if(resp?.data) resp.data["line_items_by_ally"] = allies;

        return res.status(200).json({ ...resp });
    } catch (e) {
        return res.status(500).json({ status: 'error', message: e.message });
    }
};

export default handler;
