import { Order } from "@commercelayer/sdk";
import { event as gTagEvent } from "nextjs-google-analytics";

const getElements = (products) => {
  return products.map(prod => {
    const { sku_code, item, quantity, unit_amount_float } = prod;
    const { name, discount, trademark, category } = item;

    return {
      item_id: `SKU_${sku_code}`,
      item_name: name,
      coupon: '',
      discount: discount ?? 0,
      affiliation: trademark ? `Marketplace: ${trademark.name}` : 'Marketplace Gasodomésticos',
      item_brand: trademark?.name ?? '',
      item_category: category?.name ?? '',
      item_variant: '',
      price: unit_amount_float,
      currency: 'COP',
      quantity: quantity
    };
  });
};

export const gaEventBeginCheckout = (order: Order) => {
  const elements = getElements(order?.line_items);
  const totalAmount = order?.total_amount_float ?? 0;

  gTagEvent("begin_checkout", {
    coupon: '',
    currency: 'COP',
    items: elements,
    value: totalAmount
  });
};

export const gaEventPaymentInfo = (order: Order) => {
  const elements = getElements(order?.line_items);
  const totalAmount = order?.total_amount_float ?? 0;

  gTagEvent("add_payment_info", {
    coupon: '',
    currency: 'COP',
    items: elements,
    payment_type: 'Credit/Debit Card',
    value: totalAmount
  });
};

export const gaEventPurchase = (order: Order) => {
  const elements = getElements(order?.line_items);
  const totalAmount = order?.total_amount_float ?? 0;
  const totalShipping = order?.shipping_amount_float ?? 0;

  gTagEvent("purchase", {
    affiliation: 'Marketplace Gasodomésticos',
    coupon: '',
    currency: 'COP',
    items: elements,
    transaction_id: `T_${order?.id}`,
    shipping: totalShipping,
    value: totalAmount,
    tax: 0
  });
};
