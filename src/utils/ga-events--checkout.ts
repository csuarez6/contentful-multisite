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

const getTotalAmount = (elements) => {
  return elements.reduce((acc, curr) => {
    return acc + curr.price;
  }, 0);
};

export const gaEventBeginCheckout = (products) => {
  const elements = getElements(products);
  const totalAmount = getTotalAmount(elements);

  gTagEvent("begin_checkout", {
    coupon: '',
    currency: 'COP',
    items: elements,
    value: totalAmount
  });
};

export const gaEventPaymentInfo = (products) => {
  const elements = getElements(products);
  const totalAmount = getTotalAmount(elements);

  gTagEvent("add_payment_info", {
    coupon: '',
    currency: 'COP',
    items: elements,
    payment_type: 'Credit/Debit Card',
    value: totalAmount
  });
};

export const gaEventPurchase = (order, shippingMethodGlobal) => {
  const { id, line_items } = order;
  const elements = getElements(line_items);
  const totalAmount = getTotalAmount(elements);
  const totalShipping = line_items?.reduce((acc, curr) => {
    const shippingCrr = shippingMethodGlobal.find((x) => x.name === curr?.item["shipping_category"]?.name);
    return acc + (shippingCrr?.price_amount_float ?? 0);
  }, 0);

  gTagEvent("purchase", {
    affiliation: 'Marketplace Gasodomésticos',
    coupon: '',
    currency: 'COP',
    items: elements,
    transaction_id: `T_${id}`,
    shipping: totalShipping,
    value: totalAmount,
    tax: 0
  });
};
