import { Shipment } from "@commercelayer/sdk";
import { ILineItemExtended, IOrderExtended } from "../interfaces/ally-collection.interface";
import { sendEmail } from "./mailer.service";
import { IP2PRequestInformation, P2PRequestStatus } from "../interfaces/p2p-cf-interface";
import { formatDate, getShippingMethods } from "./commerce-layer.service";
import { OrderStatus } from "../enum/EOrderStatus.enum";
import { getOrderByAlly } from "./order-by-ally.service";

const customerSection = (order: IOrderExtended, showPaymentInfo: boolean) => {
  const billing_address = order.billing_address?.line_1 + (order.billing_address?.line_2 ? ', ' + order.billing_address?.line_2 : '') + ', ' + order.billing_address?.city + ', ' + order.billing_address?.state_code;
  const shipping_address = order.shipping_address?.line_1 + (order.shipping_address?.line_2 ? ', ' + order.shipping_address?.line_2 : '') + ', ' + order.shipping_address?.city + ', ' + order.shipping_address?.state_code;
  const addresseeSection = order.shipping_address?.notes ?
    `<tr>
      <td class="sm-inline-block sm-w-full" style = "width: 50%; padding-top: 8px; padding-bottom: 8px">Destinatario: </td>
      <td class="sm-inline-block sm-w-full sm-mb-2 sm-pt-0" style = "width: 50%; padding-top: 8px; padding-bottom: 8px; font-weight: 500" >${order.shipping_address?.notes}</td>
    </tr>`
    : '';

  const paymentInfo = () => {
    if (order.status !== OrderStatus.approved) {
      return {
        paymentMethod: "*****",
        paymentEntity: "*****"
      };
    }
    const paymentInfo: IP2PRequestInformation = order.captures?.at(0).metadata?.paymentInfo;
    return {
      paymentMethod: paymentInfo?.payment.at(0)?.paymentMethodName ?? "*****",
      paymentEntity: paymentInfo?.payment.at(0)?.issuerName ?? "*****"
    };
  };

  const paymentInfoSection = showPaymentInfo ? `
      <tr>
        <td class="sm-inline-block sm-w-full" style="width: 50%; padding-top: 8px; padding-bottom: 8px">Método de pago:</td>
        <td class="sm-inline-block sm-w-full sm-mb-2 sm-pt-0" style="width: 50%; padding-top: 8px; padding-bottom: 8px; font-weight: 500">${paymentInfo().paymentMethod}</td>
      </tr>
      <tr>
        <td class="sm-inline-block sm-w-full" style="width: 50%; padding-top: 8px; padding-bottom: 8px">Entidad Bancaria:</td>
        <td class="sm-inline-block sm-w-full sm-mb-2 sm-pt-0" style="width: 50%; padding-top: 8px; padding-bottom: 8px; font-weight: 500">${paymentInfo().paymentEntity}</td>
      </tr>
    ` : '';

  const section = `
    <tr>
      <td style="padding: 24px">
        <table style="width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
          <td class="sm-inline-block sm-w-full" style="width: 50%; padding-top: 8px; padding-bottom: 8px">Nombre del adquiriente:</td>
          <td class="sm-inline-block sm-w-full sm-mb-2 sm-pt-0" style="width: 50%; padding-top: 8px; padding-bottom: 8px; font-weight: 500">${order.metadata?.name} ${order.metadata?.lastName}</td>
        </tr>
        <tr>
        <tr>
          <td class="sm-inline-block sm-w-full" style="width: 50%; padding-top: 8px; padding-bottom: 8px">Número de documento:</td>
          <td class="sm-inline-block sm-w-full sm-mb-2 sm-pt-0" style="width: 50%; padding-top: 8px; padding-bottom: 8px; font-weight: 500">${order.metadata?.documentNumber}</td>
        </tr>
        <tr>
          <td class="sm-inline-block sm-w-full" style="width: 50%; padding-top: 8px; padding-bottom: 8px">Teléfono:</td>
          <td class="sm-inline-block sm-w-full sm-mb-2 sm-pt-0" style="width: 50%; padding-top: 8px; padding-bottom: 8px; font-weight: 500">${order.metadata?.cellPhone}</td>
        </tr>
        <tr>
          <td class="sm-inline-block sm-w-full" style="width: 50%; padding-top: 8px; padding-bottom: 8px">Correo electrónico:</td>
          <td class="sm-inline-block sm-w-full sm-mb-2 sm-pt-0" style="width: 50%; padding-top: 8px; padding-bottom: 8px; font-weight: 500">${order.customer_email}</td>
        </tr>
          ${paymentInfoSection}
        <tr>
          <td class="sm-inline-block sm-w-full" style="width: 50%; padding-top: 8px; padding-bottom: 8px">Dirección de envío:</td>
          <td class="sm-inline-block sm-w-full sm-mb-2 sm-pt-0" style="width: 50%; padding-top: 8px; padding-bottom: 8px; font-weight: 500">${shipping_address}</td>
        </tr>
          ${addresseeSection}
        <tr>
          <td class="sm-inline-block sm-w-full" style="width: 50%; padding-top: 8px; padding-bottom: 8px">Dirección de facturación:</td>
          <td class="sm-inline-block sm-w-full sm-mb-2 sm-pt-0" style="width: 50%; padding-top: 8px; padding-bottom: 8px; font-weight: 500">${billing_address}</td>
        </tr>
        <tr>
          <td class="sm-inline-block sm-w-full" style="width: 50%; padding-top: 8px; padding-bottom: 8px">Método de envío:</td>
          <td class="sm-inline-block sm-w-full sm-mb-2 sm-pt-0" style="width: 50%; padding-top: 8px; padding-bottom: 8px; font-weight: 500">${getShippingMethods(order)}</td>
        </tr>
        <tr>
          <td class="sm-inline-block sm-w-full" style="width: 50%; padding-top: 8px; padding-bottom: 8px">Fecha de compra:</td>
          <td class="sm-inline-block sm-w-full sm-mb-2 sm-pt-0" style="width: 50%; padding-top: 8px; padding-bottom: 8px; font-weight: 500">${formatDate(order.placed_at)}</td>
        </tr>
        </table>
      </td>
    </tr>`;
  return section;
};

const productAdjustments = (item: ILineItemExtended, border: string, padding: number) => {
  let section = "";
  const { installlation_service, warranty_service } = item;

  const installationService = installlation_service
    .reduce((accumulator, installation) => {
      accumulator.push(installation.formatted_total_amount);
      return accumulator;
    }, [])
    .join(", ");

  const { warrantyServiceName, warrantyService } = warranty_service.reduce(
    (accumulator, warranty) => {
      accumulator.warrantyServiceName.push(warranty.name);
      accumulator.warrantyService.push(warranty.formatted_total_amount);
      return accumulator;
    },
    { warrantyServiceName: [], warrantyService: [] }
  );

  const formattedWarrantyServiceName = warrantyServiceName.join(", ");
  const formattedWarrantyService = warrantyService.join(", ");

  if (item.installlation_service?.length > 0) {
    const warranty = item.warranty_service?.length > 0;
    section +=
      `<tr>
        <td class="sm-inline-block sm-w-1-4 sm-border-0" style="width: 54px; ${warranty ? border : 'border: solid #e9e9e9; border-width: 0px 0px 1px;'} padding-top: ${padding}px; padding-bottom: ${warranty ? padding : 20}px; vertical-align: top"></td>
        <td class="sm-inline-block sm-w-3-4 sm-px-0 sm-border-0" style="${warranty ? border : 'border: solid #e9e9e9; border-width: 0px 0px 1px;'} padding: ${warranty ? padding : 20}px 20px ${warranty ? padding : 20}px 20px; vertical-align: top; font-weight: 500">
          <p>Servicio de instalación</p>
        </td>
        <td class="sm-inline-block sm-pt-0 sm-clear-both sm-w-full" style="width: 160px; ${warranty ? border : 'border: solid #e9e9e9; border-width: 0px 0px 1px;'} padding-top: ${padding}px; padding-bottom: ${warranty ? padding : 20}px; text-align: right; vertical-align: top"></td>
        <td class="sm-inline-block sm-pt-0 sm-clear-both sm-w-full" style="width: 160px; ${warranty ? border : 'border: solid #e9e9e9; border-width: 0px 0px 1px;'} padding-top: ${padding}px; padding-bottom: ${warranty ? padding : 20}px; text-align: right; vertical-align: top">
          <b style="font-weight: 700; color: #113455">${installationService}</b>
        </td>
      </tr>`;
  }

  if (item?.warranty_service?.length > 0) {
    section +=
      `<tr>
        <td class="sm-inline-block sm-w-1-4 sm-border-0" style="width: 54px; border: solid #e9e9e9; border-width: 0px 0px 1px; padding-top: ${padding}px; padding-bottom: 20px; vertical-align: top"></td>
        <td class="sm-inline-block sm-w-3-4 sm-px-0 sm-border-0" style="border: solid #e9e9e9; border-width: 0px 0px 1px; padding: ${padding}px 20px 20px 20px; vertical-align: top; font-weight: 500">
          <p>${formattedWarrantyServiceName}</p>
        </td>
        <td class="sm-inline-block sm-pt-0 sm-clear-both sm-w-full" style="width: 160px; border: solid #e9e9e9; border-width: 0px 0px 1px; padding-top: ${padding}px; padding-bottom: 20px; text-align: right; vertical-align: top"></td>
        <td class="sm-inline-block sm-pt-0 sm-clear-both sm-w-full" style="width: 160px; border: solid #e9e9e9; border-width: 0px 0px 1px; padding-top: ${padding}px; padding-bottom: 20px; text-align: right; vertical-align: top">
          <b style="font-weight: 700; color: #113455">${formattedWarrantyService}</b>
        </td>
      </tr>`;
  }

  return section;
};

const productsSection = (items: ILineItemExtended[], shipments: Shipment[]) => {
  let section = "";
  const shippingMethodNames = [];
  items.forEach((lineItem) => {
    const hasAdjustents = lineItem.installlation_service?.length > 0 || lineItem.warranty_service?.length > 0;
    const padding = hasAdjustents ? 5 : 20;
    const border = !hasAdjustents ? 'border: solid #e9e9e9; border-width: 0px 0px 1px;' : 'border: dotted #e9e9e9; border-width: 0px 0px 0.5px;';
    section +=
      `<tr class="display-none display-table-row">
        <td class="sm-inline-block sm-w-1-4 sm-border-0 sm-pb-0" style="width: 54px; ${border} padding-top: 20px; padding-bottom: ${padding}px; vertical-align: top">
          <img src="` + lineItem.image_url + `" alt style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;">
        </td>
        <td class="sm-inline-block sm-w-3-4 sm-border-0" style="${border} width: 160px; vertical-align: top; font-weight: 500">
          <div style="padding: 20px 20px ${padding}px 20px;">
            <p class="sm-text-12px sm-font-normal" style="margin: 0; font-size: 16px; font-weight: 500; color: #000">${lineItem.name} ( ${lineItem.sku_code})</p>
            <p class="sm-text-12px sm-font-normal" style="margin: 0; font-size: 16px; font-weight: 500; color: #000">Marca: ${lineItem.item?.shipping_category?.name}</p>
            <p class="sm-text-12px" style="margin: 0; font-size: 12px; font-weight: 300; color: #000">Cantidad: ${lineItem.quantity}</p>
          </div>
        </td>
        <td class="sm-inline-block sm-pt-0 sm-w-full sm-border-0" style="width: 160px; ${border} padding-top: 20px; padding-bottom: ${padding}px; text-align: right; vertical-align: top">
          <b class="sm-font-normal" style="font-weight: 700; color: #113455">${lineItem.formatted_unit_amount}</b>
          <br><small>${(lineItem.tax_rate * 100) + '%'} IVA incluido</small>
        </td>
        <td class="sm-inline-block sm-pt-0 sm-clear-both sm-w-full" style="width: 160px; ${border} padding-top: 20px; padding-bottom: ${padding}px; text-align: right; vertical-align: top">
          <b class="sm-font-normal" style="font-weight: 700; color: #113455">${lineItem.formatted_total_amount}</b>
          <br><small>${(lineItem.tax_rate * 100) + '%'} IVA incluido</small>
        </td>
      </tr>
      <thead class="mobile-table-invisible mobile-table-visible" style="width:100%">
        <tr>
            <th colspan="2" style="width:54px;border:solid #e9e9e9;border-width:0px 0px 1px;padding-top:20px;padding-bottom:5px;vertical-align:top;text-align:left">
              Concepto
            </th>
        </tr>
        <tr>
            <td style="font-family:sans-serif;font-size:14px;width:54px;border-width:0px 0px 1px;padding-top:20px;padding-bottom:20px;vertical-align:top" width="54" valign="top">
              <img src="` + lineItem.image_url + `" alt style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;"> 
            </td>
            <td style="font-family:sans-serif;font-size:14px;border-width:0px 0px 1px;width:160px;vertical-align:top;font-weight:500" width="160" valign="top">
                <div style="padding:20px 20px 20px 20px">
                  <p class="sm-text-12px sm-font-normal" style="margin: 0; font-size: 16px; font-weight: 500; color: #000">${lineItem.name} ( ${lineItem.sku_code})</p>
                  <p class="sm-text-12px sm-font-normal" style="margin: 0; font-size: 16px; font-weight: 500; color: #000">Marca: ${lineItem.item?.shipping_category?.name}</p>
                  <p class="sm-text-12px" style="margin: 0; font-size: 12px; font-weight: 300; color: #000">Cantidad: ${lineItem.quantity}</p>
                </div>
            </td>
        </tr>
        <tr>
            <th colspan="2" style="width:54px;border:solid #e9e9e9;border-width:0px 0px 1px 0px;padding-top:20px;padding-bottom:5px;vertical-align:top;text-align:left">
                Valor unitario</th>
        </tr>
        <tr>
            <td colspan="2" style="font-family:sans-serif;font-size:14px;width:160px;border-width:0px 0px 1px;padding-top:20px;padding-bottom:20px;text-align:right;vertical-align:top;text-align:left" width="160" align="left" valign="top">
            <b class="sm-font-normal" style="font-weight: 700; color: #113455">${lineItem.formatted_unit_amount}</b>
            <br><small>${(lineItem.tax_rate * 100) + '%'} IVA incluido</small>
            </td>
        </tr>
        <tr>
            <th colspan="2" style="width:54px;border:solid #e9e9e9;border-width:0px 0px 1px;padding-top:20px;padding-bottom:5px;vertical-align:top;text-align:left">
                Valor total
            </th>
        </tr>     
        <tr>
            <td colspan="2" style="font-family:sans-serif;font-size:14px;width:160px;border-width:0px 0px 1px;padding-top:20px;padding-bottom:20px;text-align:right;vertical-align:top;text-align:left" width="160" align="left" valign="top">
              <b class="sm-font-normal" style="font-weight: 700; color: #113455">${lineItem.formatted_total_amount}</b>
              <br><small>${(lineItem.tax_rate * 100) + '%'} IVA incluido</small>
            </td>
        </tr>                                            
      </thead>
      ${productAdjustments(lineItem, border, padding)}`;
  });

  shipments.forEach((shipment, idx) => {
    if (!shippingMethodNames.includes(shipment.shipping_method?.name)) {
      shippingMethodNames.push(shipment.shipping_method?.name);
      section +=
        `<tr>
          <td class="sm-inline-block sm-w-0 sm-border-0" style="width: 54px; border: solid #e9e9e9; border-width: 0px 0px 1px; padding-top: 20px; padding-bottom: 20px; vertical-align: top"></td>
          <td class="sm-inline-block sm-w-2-4 sm-px-0 sm-border-0" style="width: 160px; border: solid #e9e9e9; border-width: 0px 0px 1px; padding: 20px; vertical-align: top; font-weight: 500">
            <p class="sm-text-12px sm-font-normal" style="margin: 0; font-size: 16px; font-weight: 500; color: #000">Envío ${idx + 1} - ${shipment?.shipping_method?.name}</p>
          </td>
          <td class="sm-inline-block sm-w-0 sm-border-0" style="width: 160px; border: solid #e9e9e9; border-width: 0px 0px 1px; padding-top: 20px; padding-bottom: 20px; text-align: right; vertical-align: top"></td>
          <td class="sm-inline-block sm-clear-both sm-w-2-4 sm-border-0" style="width: 160px; border: solid #e9e9e9; border-width: 0px 0px 1px; padding-top: 20px; padding-bottom: 20px; text-align: right; vertical-align: top">
            <b class="sm-font-normal" style="font-weight: 700; color: #113455">${shipment.shipping_method?.formatted_price_amount}</b>
          </td>
        </tr>`;
    }
  });

  return section;
};

const getOrderStatus = (status: string, order: IOrderExtended) => {
  const host = process.env.DEFAULT_DOMAIN;
  switch (status) {
    case "cancelled":
      return {
        text: `¡Tu orden ${order.number} ha sido rechazada!`,
        additionalText: `Hemos recibido tu orden de compra, sin embargo esta ha sido rechazada por inconvenientes al momento de cobro.`,
        leftIcon: `2s1UZ40XOxyT7Z99fAHFDt/a64fa1f379563c9501a5280b36b0c91a/icon-cart-cancel.png`,
        rightIcon: `2qZ9m6E3GT5Cskdau8A5zV/12aa9915a9ab6e68fedc8c5cd38ba6de/icon-cancel.png`,
        showPaymentInfo: false
      };
    case "approved":
    case "fulfilled":
      return {
        text: `¡Tu orden ${order.number} ha sido aprobada!`,
        additionalText: `Hemos recibido tu orden de compra y ha sido aprobada.
          Ten en cuenta que nuestra marca aliada realizará posterior a este correo un proceso para contactarte informándote el estado final de tu orden y proceso de entrega.
          Para hacer seguimiento puedes hacer clic <a clicktracking="off" href="${host}/tienda-virtual/checkout/pse/purchase-order?id=${order.id}">aquí</a>.
          Gracias por comprar con nosotros.
          Disfruta tu compra.`,
        leftIcon: `2CMm6DK1EEC1UMlI1gwtid/1c647474524c725ce67fa40e45eceb52/icon-cart.png`,
        rightIcon: `1cAtkwe1dXM9ckG06i0gx3/f88616d9c9e899db5a8bc7dd3960bdb0/icon-check.png`,
        showPaymentInfo: true
      };
    case "create":
      return {
        text: `¡Tu orden ${order.number} ha sido creada!`,
        additionalText: `Hemos recibido tu orden de compra y estará pendiente de aprobación hasta que se confirme el pago.
          Ten en cuenta que te llegará un correo posterior a este informándote el estado final de tu orden.
          Para hacer seguimiento puedes hacer clic <a clicktracking="off" href="${host}/tienda-virtual/checkout/pse/purchase-order?id=${order.id}">aquí</a>.`,
        leftIcon: `2fKw1I7QFskoK36udjphsC/1b96eade00165bb661d7825f172249cc/icon-cart-pending.png`,
        rightIcon: `3cqEZ5d23rviVAf7UP0Ppc/ea1392943f3f06188e42c03b9cea7117/icon-pending.png`,
        showPaymentInfo: false
      };
    case "ally":
      return {
        text: `La orden ${order.number} ha sido creada!`,
        additionalText: `Hemos recibido la orden de compra en nuestro marketplace y esta ha sido creada dentro de Commerce Layer.
          Ya se puede gestionar para entregar al cliente y realizar el proceso establecido.
          Tener en cuenta actualizar el estado de la orden dentro de la plataforma para un mejor seguimiento.`,
        leftIcon: `2CMm6DK1EEC1UMlI1gwtid/1c647474524c725ce67fa40e45eceb52/icon-cart.png`,
        rightIcon: `1cAtkwe1dXM9ckG06i0gx3/f88616d9c9e899db5a8bc7dd3960bdb0/icon-check.png`,
        showPaymentInfo: true
      };
    case "vanti":
      return {
        text: `La orden ${order.number} ha sido creada!`,
        additionalText: `Hemos recibido la orden de compra en nuestro marketplace y esta ha sido creada dentro de Commerce Layer.`,
        leftIcon: `2CMm6DK1EEC1UMlI1gwtid/1c647474524c725ce67fa40e45eceb52/icon-cart.png`,
        rightIcon: `1cAtkwe1dXM9ckG06i0gx3/f88616d9c9e899db5a8bc7dd3960bdb0/icon-check.png`,
        showPaymentInfo: true
      };
    default:
      return {
        text: `¡Tu orden ${order.number} está pendiente!`,
        additionalText: ``,
        leftIcon: `2fKw1I7QFskoK36udjphsC/1b96eade00165bb661d7825f172249cc/icon-cart-pending.png`,
        rightIcon: `3cqEZ5d23rviVAf7UP0Ppc/ea1392943f3f06188e42c03b9cea7117/icon-pending.png`,
        showPaymentInfo: false
      };
  }
};

const bodySection = (status: string, order: IOrderExtended, line_items: ILineItemExtended[], shipments: Shipment[], formatted_total_amount: string) => {
  const orderStatus = getOrderStatus(status, order);

  const body = `
    <tr>
      <td class="sm-px-0" style="width: 760px; max-width: 100%; padding: 40px 16px">
        <table style="margin: auto;" cellpadding="0" cellspacing="0" role="presentation">
          <tr>
            <td style="width: 600px; max-width: 100%;">
              <table style="width: 100%; overflow: hidden; border-radius: 12px; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td class="sm-p-4" style="background-color: #EDF5FF; padding: 20px 24px">
                    <table style="width: 100%; padding-bottom: 16px;">
                      <tr>
                        <td class="sm-w-5 sm-h-5">
                          <img class="sm-w-5 sm-h-5" src="https://images.ctfassets.net/3brzg7q3bvg1/${orderStatus.leftIcon}" alt style="vertical-align: middle; line-height: 1; border: 0; height:32px; width:27px" />
                        </td>
                        <td>
                          <h2 class="sm-text-16px" style="margin: 0 0 0 12px; display: inline-block; vertical-align: middle; font-size: 18px; font-weight: 500; color: #000">
                            ${orderStatus.text}
                          </h2>
                        </td>
                        <td class="sm-w-6">
                          <img class="sm-w-6 sm-h-6" src="https://images.ctfassets.net/3brzg7q3bvg1/${orderStatus.rightIcon}" alt style="width: 32px; vertical-align: middle; line-height: 1; border: 0; float: right; height: 32px;" />
                        </td>
                      </tr>
                    </table>
                    ${orderStatus.additionalText ? '<div style="text-align: justify;"><small>' + orderStatus.additionalText + '</small></div>' : ''}
                  </td>
                </tr>
                ${customerSection(order, orderStatus.showPaymentInfo)}
                <tr>
                  <td style="padding-left: 24px; padding-right: 24px;">
                    <h3 style="margin: 0; font-size: 20px; color: #113455;">
                      Detalle de tu pedido
                    </h3>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0 24px 24px 24px">
                    <table style="width: 100%;" cellpadding="0" cellspacing="0" role="presentation" class="display-table display-none">
                      <thead>
                        <tr>
                          <th colspan="2" class="sm-inline-block sm-w-1-4 sm-border-0 sm-pb-0" style="width: 54px; border: solid #e9e9e9; border-width: 0px 0px 1px; padding-top: 20px; padding-bottom: 5px; vertical-align: top; text-align: left;">Concepto</th>
                          <th class="sm-inline-block sm-w-1-4 sm-border-0 sm-pb-0" style="width: 54px; border: solid #e9e9e9; border-width: 0px 0px 1px; padding-top: 20px; padding-bottom: 5px; vertical-align: top; text-align: right;">Valor unitario</th>
                          <th class="sm-inline-block sm-w-1-4 sm-border-0 sm-pb-0" style="width: 54px; border: solid #e9e9e9; border-width: 0px 0px 1px; padding-top: 20px; padding-bottom: 5px; vertical-align: top; text-align: right;">Valor total</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${productsSection(line_items, shipments)}
                      </tbody>
                    </table>
                    <table style="width: 100%;" cellpadding="0" cellspacing="0" role="presentation" class="mobile-table-invisible mobile-table-visible">
                        ${productsSection(line_items, shipments)}
                    </table>
                    <div style="margin-top: 20px; border-radius: 8px; background-color: #EDF5FF; padding: 10px 16px; text-align: center; font-weight: 700; color: #113455">
                      TOTAL <span style="margin-left: 12px;">${formatted_total_amount}</span>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;

  return body;
};

const header = (title: string) => {
  return `
    <!DOCTYPE html>
    <html lang="en" xmlns:v="urn:schemas-microsoft-com:vml">
        <head>
        <meta charset="utf-8">
        <meta name="x-apple-disable-message-reformatting">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no">
        <meta name="color-scheme" content="light dark">
        <meta name="supported-color-schemes" content="light dark">
        <!--[if mso]>
        <noscript>
            <xml>
            <o:OfficeDocumentSettings xmlns:o="urn:schemas-microsoft-com:office:office">
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
            </xml>
        </noscript>
        <style>
            td,th,div,p,a,h1,h2,h3,h4,h5,h6 {font-family: "Segoe UI", sans-serif; mso-line-height-rule: exactly;}
        </style>
        <![endif]-->
        <style>
            @media (max-width: 600px) {
              .sm-clear-both {
                  clear: both !important
              }
              .sm-mb-2 {
                  margin-bottom: 8px !important
              }
              .sm-mt-4 {
                  margin-top: 16px !important
              }
              .sm-inline-block {
                  display: inline-block !important
              }
              .sm-w-0 {
                  width: 0% !important
              }
              .sm-w-1-4 {
                  width: 25% !important
              }
              .sm-w-2-4 {
                  width: 50% !important
              }
              .sm-w-3-4 {
                  width: 75% !important
              }
              .sm-w-36 {
                  width: 144px !important
              }
              .sm-w-48 {
                  width: 192px !important
              }
              .sm-w-5 {
                  width: 20px !important
              }
              .sm-h-5 {
                  height: 20px !important
              }
              .sm-w-6 {
                  width: 24px !important
              }
              .sm-h-6 {
                  height: 24px !important
              }
              .sm-w-full {
                  width: 100% !important
              }
              .sm-border-0 {
                  border-width: 0px !important
              }
              .sm-p-4 {
                  padding: 16px !important
              }
              .sm-px-0 {
                  padding-left: 0 !important;
                  padding-right: 0 !important
              }
              .sm-pb-4 {
                  padding-bottom: 16px !important
              }
              .sm-pb-0 {
                  padding-bottom: 0 !important
              }
              .sm-pt-0 {
                  padding-top: 0 !important
              }
              .sm-pt-4 {
                  padding-top: 16px !important
              }
              .sm-text-center {
                  text-align: center !important
              }
              .sm-text-justify {
                  text-align: justify !important
              }
              .sm-text-12px {
                  font-size: 12px !important
              }
              .sm-text-10px {
                  font-size: 10px !important
              }
              .sm-text-16px {
                  font-size: 16px !important
              }
              .sm-text-20px {
                  font-size: 20px !important
              }
              .sm-font-normal {
                  font-weight: 400 !important
              }
            }
        </style>
        <style media="screen and (min-width:900px)">
        .display-table {
          display: table !important;
        }
        .mobile-table-invisible {
          display: none !important;
        }
        .display-table-row { 
          display: table-row !important;
        }
      </style>
      <style type="text/css">
          @media only screen and (max-width:900px) {
              .display-none {
                  display: none !important;
              }
              .mobile-table-visible {
                  display: table !important;
              }
          }
      </style>
        </head>
        <body style="margin: 0; width: 100%; padding: 0; -webkit-font-smoothing: antialiased; word-break: break-word">
            <div role="article" aria-roledescription="email" aria-label lang="en">
            <div style="background-color: #fff; font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif; color: #594F40">
                <table align="center" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                <td style="width: 760px; max-width: 100%; padding: 16px">
                    <table style="margin: auto" cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                        <td style="width: 600px; max-width: 100%">
                        <table style="width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
                            <tr>
                            <td class="sm-text-center sm-w-full sm-inline-block" style="width: 50%; vertical-align: middle">
                                <a href="#">
                                <img class="sm-w-36" src="https://images.ctfassets.net/3brzg7q3bvg1/4Yucd7ptLlvZx6WAEwdwIt/2e2e7b9505f63c9c1ca6bcf79c4de353/logo-vanti.png" alt="Vanti" style="vertical-align: middle; line-height: 1; border: 0; max-width: 100%">
                                </a>
                            </td>
                            <td class="sm-text-center sm-w-full sm-inline-block" style="width: 50%; text-align: right; vertical-align: middle">
                                <h1 class="sm-mt-4 sm-text-20px" style="margin: 0; font-size: 24px; line-height: 1.25; color: #113455">${title}</h1>
                            </td>
                            </tr>
                        </table>
                        </td>
                    </tr>
                    </table>
                </td>
                </tr>
                <tr role="separator">
                <td>
                    <hr style="margin: 0; border-width: 0px 0px 1px; border-color: #CAD8E8">
                </td>
                </tr>`;
};

const footer = `
    <tr>
        <td style="width: 760px; max-width: 100%; background: url(https://images.ctfassets.net/3brzg7q3bvg1/3VlVtKTosyC8SeUuXLriJq/6320c94f66058eb3a84f26f529e6811e/bg.png) left top / cover #0e337b;">
          <table style="margin: auto;" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
              <td style="width: 600px; max-width: 100%; padding-left: 20px; padding-right: 20px;">
                <table style="width: 100%; border-collapse: collapse; font-size: 13px; line-height: 1.5; color: #fff" cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                    <td class="sm-inline-block sm-w-full sm-text-center sm-px-0 sm-pb-4" style="width: 50%; border-width: 0px; padding-top: 48px; padding-bottom: 48px">
                      <a href="#" style="margin: 8px; display: inline-block; text-decoration-line: none">
                        <img src="https://images.ctfassets.net/3brzg7q3bvg1/2f2DQeLCzYKKhf06Q4oF0Q/624bec280fd1d2611b0bacdfbcbd42e9/icono-facebook.png" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;" alt="">
                      </a>
                      <a href="#" style="margin: 8px; display: inline-block; text-decoration-line: none;">
                        <img src="https://images.ctfassets.net/3brzg7q3bvg1/1jOxrI1mdPfOhrzYxZTYLZ/222196b3bc2d7cabea69d66642f0195f/icono-instagram.png" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;" alt="">
                      </a>
                      <a href="#" style="margin: 8px; display: inline-block; text-decoration-line: none;">
                        <img src="https://images.ctfassets.net/3brzg7q3bvg1/20OWOpGqZu9GjLi2VSuwf1/05d7437a0677f2df9cebb046fc43c180/icono-linkedin.png" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;" alt="">
                      </a>
                      <a href="#" style="margin: 8px; display: inline-block; text-decoration-line: none;">
                        <img src="https://images.ctfassets.net/3brzg7q3bvg1/3vqWQwN9MtUdblVZ990UDc/73419d83f7f405509a43885bc460e2a6/icono-youtube.png" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;" alt="">
                      </a>
                      <a href="#" style="margin: 8px; display: inline-block; text-decoration-line: none;">
                        <img src="https://images.ctfassets.net/3brzg7q3bvg1/2xAfqJ21g4AISI1192gk5f/df8a234dc89d4ffb954834b387a6bc7f/icono-twitter.png" style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;" alt="">
                      </a>
                    </td>
                    <td class="sm-inline-block sm-w-full sm-text-center sm-px-0 sm-pt-4" style="width: 50%; border-width: 0px; padding-top: 48px; padding-bottom: 48px; text-align: right">
                      <a href="#" style="color: inherit">
                        ¿Necesitas ayuda?
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <hr style="margin: 0; border-width: 0px 0px 1px; border-color: #CAD8E8;">
          <table style="margin: auto;" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
              <td style="width: 600px; max-width: 100%; padding-left: 20px; padding-right: 20px;">
                <table style="width: 100%; border-collapse: collapse; font-size: 13px; line-height: 1.5; color: #fff;" cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                    <td class="sm-text-justify sm-inline-block sm-w-full" style="width: 50%; padding-top: 20px; padding-bottom: 20px">
                      <p>
                        Todos los derechos reservados Vanti S.A. ESP. - Calle 71A No. 5-38 Bogotá -
                        Emergencias: 164 - Líneas de Atención al Cliente: Hogar – Comercial 601 – 3078121, Institucionales, Industria y GNV: 601 - 7053256
                        NIT: 800.007.813-5
                      </p>
                    </td>
                    <td class="sm-inline-block sm-text-center sm-pt-0 sm-w-full" style="width: 50%; padding-top: 20px; padding-bottom: 20px; text-align: right">
                      <img class="sm-w-48" src="images/logo-industria-comercio.png" alt style="vertical-align: middle; line-height: 1; border: 0; max-width: 100%">
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      </table>
      </div>
      </div>
      </body>
    </html>`;

const sendCreateOrderEmail = async (order: IOrderExtended): Promise<number> => {
  try {
    const body = bodySection('create', order, order.line_items, order.shipments, order.formatted_total_amount);
    const email = header('Resumen del pedido') + body + footer;

    const clientEmail = {
      to: order.customer_email,
      subject: "Confirmación orden " + order.number + " - Vanti",
      message: "Body-email",
      from: "Vanti info <dev@aplyca.com>",
      messageHtml: email,
    };

    const isMailSended = await sendEmail(
      clientEmail.to,
      clientEmail.subject,
      clientEmail.message,
      clientEmail.from,
      clientEmail.messageHtml
    );

    console.info('sendCreateOrderEmail ' + clientEmail.to + ': ' + isMailSended);
    return isMailSended ? 1 : 0;
  } catch (error) {
    console.error(error);
    return 0;
  }
};

const sendClientEmail = async (orderByAlly: IOrderExtended): Promise<number> => {
  try {
    const body = bodySection(orderByAlly.status, orderByAlly, orderByAlly.line_items, orderByAlly.shipments, orderByAlly.formatted_total_amount);
    const email = header('Resumen de compra') + body + footer;

    const clientEmail = {
      to: orderByAlly.customer_email,
      subject: "Confirmación orden " + orderByAlly.number + " - Vanti",
      message: "Body-email",
      from: "Vanti info <dev@aplyca.com>",
      messageHtml: email,
    };

    const isMailSended = await sendEmail(
      clientEmail.to,
      clientEmail.subject,
      clientEmail.message,
      clientEmail.from,
      clientEmail.messageHtml
    );

    console.info('sendClientEmail ' + clientEmail.to + ': ' + isMailSended);
    return isMailSended ? 1 : 0;
  } catch (error) {
    console.error(error);
    return 0;
  }
};

const sendVantiEmail = async (orderByAlly: IOrderExtended): Promise<number> => {
  try {
    const body = bodySection('vanti', orderByAlly, orderByAlly.line_items, orderByAlly.shipments, orderByAlly.formatted_total_amount);
    const email = header('Resumen de compra') + body + footer;

    const vantiEmailAddress = process.env.VANTI_EMAIL_ADDRESS;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!vantiEmailAddress || !emailRegex.test(vantiEmailAddress)) {
      console.info('sendVantiEmail environment variable not defined or is not a valid email');
      return 0;
    }

    const clientEmail = {
      to: vantiEmailAddress,
      subject: "Confirmación orden " + orderByAlly.number + " - Vanti",
      message: "Body-email",
      from: "Vanti info <dev@aplyca.com>",
      messageHtml: email,
    };

    const isMailSended = await sendEmail(
      clientEmail.to,
      clientEmail.subject,
      clientEmail.message,
      clientEmail.from,
      clientEmail.messageHtml
    );

    console.info('sendVantiEmail ' + clientEmail.to + ': ' + isMailSended);
    return isMailSended ? 1 : 0;
  } catch (error) {
    console.error(error);
    return 0;
  }
};

const sendAllyEmail = async (orderByAlly: IOrderExtended): Promise<number> => {
  try {
    const allyItems = orderByAlly.line_items_by_ally;
    const emailPromises: Promise<boolean>[] = [];

    allyItems.forEach((allyItem) => {
      const productsData = allyItem;
      const body = bodySection('ally', orderByAlly, productsData.line_items, productsData.shipments, productsData.formatted_ally_shipping_total_amount);
      const email = header('Resumen de compra') + body + footer;

      const emailAddresses = String(allyItem.metadata?.email).split(',');

      if (!emailAddresses) {
        console.info('sendAllyEmail no email for ' + allyItem.name);
      }

      emailAddresses.forEach((emailAddress) => {
        const clientEmail = {
          to: emailAddress,
          subject: "Confirmación orden " + orderByAlly.number + " - Vanti",
          message: "Body-email",
          from: "Vanti info <dev@aplyca.com>",
          messageHtml: email,
        };

        const emailPromise = sendEmail(
          clientEmail.to,
          clientEmail.subject,
          clientEmail.message,
          clientEmail.from,
          clientEmail.messageHtml
        );

        emailPromises.push(emailPromise);

        emailPromise.then((isMailSended) => {
          console.info('sendAllyEmail ' + emailAddress + ': ' + isMailSended);
        });
      });
    });

    const emailResults = await Promise.all(emailPromises);
    const count = emailResults.filter((result) => result).length;
    return count;
  } catch (error) {
    console.error(error);
    return 0;
  }
};

export const sendEmails = async (orderId: string, createEmail = false, statusP2P?: string): Promise<number> => {
  const order = (await getOrderByAlly(orderId)).data;
  let count = 0;
  if (createEmail) {
    count += await sendCreateOrderEmail(order);
  } else {
    count += await sendClientEmail(order);
    if (statusP2P && statusP2P === P2PRequestStatus.approved) {
      count += await sendVantiEmail(order);
      count += await sendAllyEmail(order);
    }
  }
  return count;
};