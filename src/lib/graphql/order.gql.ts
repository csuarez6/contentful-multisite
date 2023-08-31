import { QueryParamsRetrieve } from "@commercelayer/sdk";

export const DEFAULT_ORDER_PARAMS: QueryParamsRetrieve = {
    include: ["line_items", "market", "market.price_list", "line_items.item", "line_items.item.shipping_category", "available_payment_methods", "authorizations", "authorizations.captures", "authorizations.voids", "customer", "shipments", "shipments.shipping_method", "billing_address", "shipping_address", "payment_source"],
    fields: {
        orders: [
            "number",
            "status",
            "line_items",
            "customer",
            "authorizations",
            "metadata",
            "customer_email",
            "shipments",
            "billing_address",
            "shipping_address",
            "formatted_total_amount",
            "total_amount_float",
            "approved_at",
            "market",
            "available_payment_methods",
            "payment_source"
        ],
        addresses: [
            "state_code",
            "city",
            "line_1",
            "line_2",
            "notes",
            "phone",
            "state_code"
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
        ],
        markets: [
            "name",
            "price_list"
        ],
        shipments: [
            "shipping_method",
        ],
    }
};