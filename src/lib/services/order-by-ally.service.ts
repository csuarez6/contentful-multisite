import { getCommercelayerProductPrice, getUpdatedOrderAdminService } from '@/lib/services/commerce-layer.service';
import { formatPrice, generateAmountCents } from '@/utils/functions';
import { IAlly, IAllyResponse, ILineItemExtended } from '@/lib/interfaces/ally-collection.interface';
import { DEFAULT_ORDER_PARAMS } from '../graphql/order.gql';

export const getOrderByAlly = async (orderId: string): Promise<IAllyResponse> => {
  try {
    const resp: IAllyResponse = await getUpdatedOrderAdminService(orderId, DEFAULT_ORDER_PARAMS, false);
    const allies = [];
    const promises = [];
    resp?.data?.line_items?.forEach(async (line_item: ILineItemExtended) => {
      try {
        let targetIndex = allies.findIndex((value: IAlly) => value.id === line_item.item.shipping_category.id);
        const promise = getCommercelayerProductPrice(line_item.sku_code, resp.data.market).then((price) => {
            if (targetIndex === -1) {
              line_item.price = price;
              allies.push({ ...line_item.item.shipping_category });

              targetIndex = allies.length - 1;
            }
            if (!(allies[targetIndex]?.line_items)) allies[targetIndex].line_items = [];
            allies[targetIndex].line_items.push({ ...line_item });
          });
          promises.push(promise);
      } catch (iteration_error) {
        console.error("An error has ocurred when the iteration line_item by ally was executed with the object:", line_item, "the error:", iteration_error);
      }
    });

    await Promise.all(promises);

    allies.map((ally: IAlly) => {
      try {
        let shippingPrice = 0;
        const shipments = resp.data.shipments.filter((shipment) => {
          if (shipment.shipping_method?.name === ally.name || shipment.shipping_method?.name === 'Estándar') {
            shippingPrice += shipment.shipping_method.price_amount_float;
          }
          return shipment.shipping_method?.name === ally.name || shipment.shipping_method?.name === 'Estándar';
        });

        const ally_total_amount_float = generateAmountCents(ally?.line_items).reduce((acum, current) => acum + current.product_amount_float ?? 0, 0);
        ally.ally_total_amount_float = ally_total_amount_float;
        ally.ally_total_shipping_amount_float = ally_total_amount_float + shippingPrice;
        ally.formatted_ally_total_amount = formatPrice(ally_total_amount_float);
        ally.formatted_ally_shipping_total_amount = formatPrice(ally.ally_total_shipping_amount_float);
        ally.shipments = shipments;
      } catch (calculation_error) {
        console.error("An error has ocurred with the total calculation for the ally:", ally, "the error:", calculation_error);
        ally.ally_total_amount_float = null;
        ally.ally_total_shipping_amount_float = null;
        ally.formatted_ally_total_amount = null;
        ally.formatted_ally_shipping_total_amount = null;
      }
    });

    if (resp?.data) resp.data["line_items_by_ally"] = allies;

    return resp;
  } catch (general_error) {
    console.error("A general error has occurred during the execution of the endpoint by-ally:", general_error);
    return { status: 500, message: "A general error has occurred" };
  }
};