import { Shipment } from "@commercelayer/sdk";
import { IAlly, ILineItemExtended, IOrderExtended } from "../interfaces/ally-collection.interface";
import { sendEmail } from "./mailer.service";
import { IP2PRequestInformation } from "../interfaces/p2p-cf-interface";

const customerSection = (data: IOrderExtended) => {
  const buyDate = new Date(data.approved_at);

  const formattedTime = [
    String(buyDate.getHours()).padStart(2, '0'),
    String(buyDate.getMinutes()).padStart(2, '0'),
    String(buyDate.getSeconds()).padStart(2, '0')
  ].join(':');
  const formattedDate = [
    String(buyDate.getDate()).padStart(2, '0'),
    String(buyDate.getMonth() + 1).padStart(2, '0'),
    buyDate.getFullYear()
  ].join('/');

  const billing_address = data.billing_address?.line_1 + (data.billing_address?.line_2 ? ', ' + data.billing_address?.line_2 : '') + ', ' + data.billing_address?.city + ', ' + data.billing_address?.state_code;
  const shipping_address = data.shipping_address?.line_1 + (data.shipping_address?.line_2 ? ', ' + data.shipping_address?.line_2 : '') + ', ' + data.shipping_address?.city + ', ' + data.shipping_address?.state_code;
  const shipping_methods = data.shipments?.map((shipment) => {
    return shipment.shipping_method?.name;
  }).join(", ");

  const addresseeSection = data.shipping_address?.notes ?
    `<tr>
      <td class="sm-inline-block sm-w-full" style = "width: 50%; padding-top: 8px; padding-bottom: 8px">Destinatario: </td>
      <td class="sm-inline-block sm-w-full sm-mb-2 sm-pt-0" style = "width: 50%; padding-top: 8px; padding-bottom: 8px; font-weight: 500" >${data.shipping_address?.notes}</td>
    </tr>`
    : '';

  const paymentInfo = () => {
    const paymentInfo: IP2PRequestInformation = data.captures?.at(0).metadata?.paymentInfo;
    return {
      paymentMethod: paymentInfo?.payment.at(0)?.paymentMethodName ?? "-----",
      payymentEntity: paymentInfo?.payment.at(0)?.issuerName ?? "-----"
    };
  };

  const section = `
    <tr>
      <td style="padding: 24px">
      <table style="width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td class="sm-inline-block sm-w-full" style="width: 50%; padding-top: 8px; padding-bottom: 8px">Nombre del adquiriente:</td>
        <td class="sm-inline-block sm-w-full sm-mb-2 sm-pt-0" style="width: 50%; padding-top: 8px; padding-bottom: 8px; font-weight: 500">${data.metadata?.name} ${data.metadata?.lastName}</td>
      </tr>
      <tr>
        <td class="sm-inline-block sm-w-full" style="width: 50%; padding-top: 8px; padding-bottom: 8px">Cédula de ciudadanía:</td>
        <td class="sm-inline-block sm-w-full sm-mb-2 sm-pt-0" style="width: 50%; padding-top: 8px; padding-bottom: 8px; font-weight: 500">${data.metadata?.documentNumber}</td>
      </tr>
      <tr>
        <td class="sm-inline-block sm-w-full" style="width: 50%; padding-top: 8px; padding-bottom: 8px">Teléfono:</td>
        <td class="sm-inline-block sm-w-full sm-mb-2 sm-pt-0" style="width: 50%; padding-top: 8px; padding-bottom: 8px; font-weight: 500">${data.metadata?.cellPhone}</td>
      </tr>
      <tr>
        <td class="sm-inline-block sm-w-full" style="width: 50%; padding-top: 8px; padding-bottom: 8px">Correo electrónico:</td>
        <td class="sm-inline-block sm-w-full sm-mb-2 sm-pt-0" style="width: 50%; padding-top: 8px; padding-bottom: 8px; font-weight: 500">${data.customer_email}</td>
      </tr>
      <tr>
        <td class="sm-inline-block sm-w-full" style="width: 50%; padding-top: 8px; padding-bottom: 8px">Método de pago:</td>
        <td class="sm-inline-block sm-w-full sm-mb-2 sm-pt-0" style="width: 50%; padding-top: 8px; padding-bottom: 8px; font-weight: 500">${paymentInfo().paymentMethod}</td>
      </tr>
      <tr>
        <td class="sm-inline-block sm-w-full" style="width: 50%; padding-top: 8px; padding-bottom: 8px">Entidad Bancaria:</td>
        <td class="sm-inline-block sm-w-full sm-mb-2 sm-pt-0" style="width: 50%; padding-top: 8px; padding-bottom: 8px; font-weight: 500">${paymentInfo().payymentEntity}</td>
      </tr>
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
        <td class="sm-inline-block sm-w-full sm-mb-2 sm-pt-0" style="width: 50%; padding-top: 8px; padding-bottom: 8px; font-weight: 500">${shipping_methods}</td>
      </tr>
      <tr>
        <td class="sm-inline-block sm-w-full" style="width: 50%; padding-top: 8px; padding-bottom: 8px">Fecha de compra:</td>
        <td class="sm-inline-block sm-w-full sm-mb-2 sm-pt-0" style="width: 50%; padding-top: 8px; padding-bottom: 8px; font-weight: 500">${formattedDate} ${formattedTime}</td>
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

  if (item.warranty_service?.length > 0) {
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

const productPrices = (formatted_compare_at_amount: string, formatted_unit_amount: string) => {
  const price = formatted_compare_at_amount === formatted_unit_amount ? formatted_unit_amount : `<strike>${formatted_compare_at_amount}</strike> ${formatted_unit_amount}`;
  return price;
};

const productsSection = (items: ILineItemExtended[], shipments: Shipment[]) => {
  let section = "";
  const shippingMethodNames = [];
  items.forEach((lineItem) => {
    const hasAdjustents = lineItem.installlation_service?.length > 0 || lineItem.warranty_service?.length > 0;
    const padding = hasAdjustents ? 5 : 20;
    const border = !hasAdjustents ? 'border: solid #e9e9e9; border-width: 0px 0px 1px;' : 'border: dotted #e9e9e9; border-width: 0px 0px 0.5px;';
    section +=
      `<tr>
        <td class="sm-inline-block sm-w-1-4 sm-border-0" style="width: 54px; ${border} padding-top: 20px; padding-bottom: ${padding}px; vertical-align: top">
          <img src="` + lineItem.image_url + `" alt style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;">
        </td>
        <td class="sm-inline-block sm-w-3-4 sm-px-0 sm-border-0" style="${border} padding: 20px 20px ${padding}px 20px; vertical-align: top; font-weight: 500">
          <p class="sm-text-12px" style="margin: 0; font-size: 16px; font-weight: 500; color: #000">${lineItem.name} ( ${lineItem.sku_code})</p>
          <p class="sm-text-12px" style="margin: 0; font-size: 16px; font-weight: 500; color: #000">Marca: ${lineItem.item?.shipping_category?.name}</p>
          <ul class="sm-text-12px" style="margin-bottom: 0; margin-top: 4px; list-style-type: none; padding: 0; font-size: 13px">
            <li>* IVA incluido</li>
            <li>Cantidad: ${lineItem.quantity}</li>
          </ul>
        </td>
        <td class="sm-inline-block sm-pt-0 sm-clear-both sm-w-full" style="width: 160px; ${border} padding-top: 20px; padding-bottom: ${padding}px; text-align: right; vertical-align: top">
          <b style="font-weight: 700; color: #113455">${productPrices(lineItem.price?.formatted_compare_at_amount, lineItem.formatted_unit_amount)}</b>
        </td>
        <td class="sm-inline-block sm-pt-0 sm-clear-both sm-w-full" style="width: 160px; ${border} padding-top: 20px; padding-bottom: ${padding}px; text-align: right; vertical-align: top">
          <b style="font-weight: 700; color: #113455">${lineItem.formatted_total_amount}</b>
        </td>
      </tr>
      ${productAdjustments(lineItem, border, padding)}`;
  });

  shipments.forEach((shipment) => {
    if (!shippingMethodNames.includes(shipment.shipping_method?.name)) {
      shippingMethodNames.push(shipment.shipping_method?.name);
      section +=
        `<tr>
          <td class="sm-inline-block sm-w-1-4 sm-border-0" style="width: 54px; border: solid #e9e9e9; border-width: 0px 0px 1px; padding-top: 20px; padding-bottom: 20px; vertical-align: top"></td>
          <td class="sm-inline-block sm-w-3-4 sm-px-0 sm-border-0" style="border: solid #e9e9e9; border-width: 0px 0px 1px; padding: 20px; vertical-align: top; font-weight: 500">
            <p class="sm-text-12px" style="margin: 0; font-size: 16px; font-weight: 500; color: #000">Envío ${shipment.shipping_method?.name}</p>
            <ul class="sm-text-12px" style="margin-bottom: 0; margin-top: 4px; list-style-type: none; padding: 0; font-size: 13px"></ul>
          </td>
          <td class="sm-inline-block sm-pt-0 sm-clear-both sm-w-full" style="width: 160px; border: solid #e9e9e9; border-width: 0px 0px 1px; padding-top: 20px; padding-bottom: 20px; text-align: right; vertical-align: top"></td>
          <td class="sm-inline-block sm-pt-0 sm-clear-both sm-w-full" style="width: 160px; border: solid #e9e9e9; border-width: 0px 0px 1px; padding-top: 20px; padding-bottom: 20px; text-align: right; vertical-align: top">
            <b style="font-weight: 700; color: #113455">${shipment.shipping_method?.formatted_price_amount}</b>
          </td>
        </tr>`;
    }
  });

  return section;
};

const header = `
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
            .sm-w-1-4 {
                width: 25% !important
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
            .sm-w-6 {
                width: 24px !important
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
            .sm-text-16px {
                font-size: 16px !important
            }
            .sm-text-20px {
                font-size: 20px !important
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
                                <h1 class="sm-mt-4 sm-text-20px" style="margin: 0; font-size: 24px; line-height: 1.25; color: #113455">Resumen de compra</h1>
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

const clientEmailTemplate = (status: string, data: IOrderExtended) => {
  const body = `
    <tr>
      <td class="sm-px-0" style="width: 760px; max-width: 100%; padding: 40px 16px">
        <table style="margin: auto;" cellpadding="0" cellspacing="0" role="presentation">
          <tr>
            <td style="width: 600px; max-width: 100%;">
              <table style="width: 100%; overflow: hidden; border-radius: 12px; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td class="sm-p-4" style="background-color: #EDF5FF; padding: 20px 24px">
                    <img class="sm-w-5" src="https://images.ctfassets.net/3brzg7q3bvg1/2CMm6DK1EEC1UMlI1gwtid/1c647474524c725ce67fa40e45eceb52/icon-cart.png" alt style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0">
                    <h2 class="sm-text-16px" style="margin: 0 0 0 12px; display: inline-block; vertical-align: middle; font-size: 18px; font-weight: 500; color: #000">
                      ¡Tu orden ${data.number} ha sido ${status}!
                    </h2>
                    <img class="sm-w-6" src="https://images.ctfassets.net/3brzg7q3bvg1/1cAtkwe1dXM9ckG06i0gx3/f88616d9c9e899db5a8bc7dd3960bdb0/icon-check.png" alt style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0; float: right">
                  </td>
                </tr>
                 ${customerSection(data)}
                <tr>
                  <td style="padding-left: 16px; padding-right: 16px;">
                    <h3 style="margin: 0; font-size: 20px; color: #113455">
                      Detalle de tu pedido
                    </h3>
                  </td>
                </tr>
                <tr>
                  <td style="padding-left: 24px; padding-right: 24px; padding-bottom: 24px">
                    <table style="width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
                      ${productsSection(data.line_items, data.shipments)}
                    </table>
                    <div style="margin-top: 20px; border-radius: 8px; background-color: #EDF5FF; padding: 10px 16px; text-align: center; font-weight: 700; color: #113455">
                      TOTAL <span style="margin-left: 12px;">${data.formatted_total_amount}</span>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;

  return header + body + footer;
};

const vantiEmailTemplate = (data: IOrderExtended) => {
  const body = `
    <tr>
      <td class="sm-px-0" style="width: 760px; max-width: 100%; padding: 40px 16px">
        <table style="margin: auto;" cellpadding="0" cellspacing="0" role="presentation">
          <tr>
            <td style="width: 600px; max-width: 100%;">
              <table style="width: 100%; overflow: hidden; border-radius: 12px; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td class="sm-p-4" style="background-color: #EDF5FF; padding: 20px 24px">
                    <img class="sm-w-5" src="https://images.ctfassets.net/3brzg7q3bvg1/2CMm6DK1EEC1UMlI1gwtid/1c647474524c725ce67fa40e45eceb52/icon-cart.png" alt style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0">
                    <h2 class="sm-text-16px" style="margin: 0 0 0 12px; display: inline-block; vertical-align: middle; font-size: 18px; font-weight: 500; color: #000">
                      ¡La orden ${data.number} ha sido aprobada!
                    </h2>
                    <img class="sm-w-6" src="https://images.ctfassets.net/3brzg7q3bvg1/1cAtkwe1dXM9ckG06i0gx3/f88616d9c9e899db5a8bc7dd3960bdb0/icon-check.png" alt style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0; float: right">
                  </td>
                </tr>
                 ${customerSection(data)}
                <tr>
                  <td style="padding-left: 16px; padding-right: 16px;">
                    <h3 style="margin: 0; font-size: 20px; color: #113455">
                      Detalle del pedido
                    </h3>
                  </td>
                </tr>
                <tr>
                  <td style="padding-left: 24px; padding-right: 24px; padding-bottom: 24px">
                    <table style="width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
                      ${productsSection(data.line_items, data.shipments)}
                    </table>
                    <div style="margin-top: 20px; border-radius: 8px; background-color: #EDF5FF; padding: 10px 16px; text-align: center; font-weight: 700; color: #113455">
                      TOTAL <span style="margin-left: 12px;">${data.formatted_total_amount}</span>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;

  return header + body + footer;
};

const allyEmailTemplate = (data: IOrderExtended, productsData: IAlly) => {
  const body = `
    <tr>
      <td class="sm-px-0" style="width: 760px; max-width: 100%; padding: 40px 16px">
        <table style="margin: auto;" cellpadding="0" cellspacing="0" role="presentation">
          <tr>
            <td style="width: 600px; max-width: 100%;">
              <table style="width: 100%; overflow: hidden; border-radius: 12px; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td class="sm-p-4" style="background-color: #EDF5FF; padding: 20px 24px">
                    <img class="sm-w-5" src="https://images.ctfassets.net/3brzg7q3bvg1/2CMm6DK1EEC1UMlI1gwtid/1c647474524c725ce67fa40e45eceb52/icon-cart.png" alt style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0">
                    <h2 class="sm-text-16px" style="margin: 0 0 0 12px; display: inline-block; vertical-align: middle; font-size: 18px; font-weight: 500; color: #000">
                      ¡La orden ${data.number} ha sido aprobada!
                    </h2>
                    <img class="sm-w-6" src="https://images.ctfassets.net/3brzg7q3bvg1/1cAtkwe1dXM9ckG06i0gx3/f88616d9c9e899db5a8bc7dd3960bdb0/icon-check.png" alt style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0; float: right">
                  </td>
                </tr>
                <tr>
                  <td style="padding: 24px">
                  <table style="width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
                    ${customerSection(data)}
                  </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding-left: 16px; padding-right: 16px;">
                    <h3 style="margin: 0; font-size: 20px; color: #113455">
                      Detalle del pedido
                    </h3>
                  </td>
                </tr>
                <tr>
                  <td style="padding-left: 24px; padding-right: 24px; padding-bottom: 24px">
                    <table style="width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
                      ${productsSection(productsData.line_items, productsData.shipments)}
                    </table>
                    <div style="margin-top: 20px; border-radius: 8px; background-color: #EDF5FF; padding: 10px 16px; text-align: center; font-weight: 700; color: #113455">
                      TOTAL <span style="margin-left: 12px;">${productsData.formatted_ally_shipping_total_amount}</span>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;

  return header + body + footer;
};

export const sendClientEmail = async (orderByAlly: IOrderExtended): Promise<number> => {
  const jsonBody = orderByAlly;
  const status = orderByAlly.status === "approved" ? "aprobada" : "cancelada";
  const email = clientEmailTemplate(status, jsonBody);

  const clientEmail = {
    to: jsonBody.customer.email,
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
};

export const sendVantiEmail = async (orderByAlly: IOrderExtended): Promise<number> => {
  const jsonBody = orderByAlly;
  const email = vantiEmailTemplate(jsonBody);
  const vantiEmailAddress = process.env.VANTI_EMAIL_ADDRESS;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!vantiEmailAddress || !emailRegex.test(email)) {
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
};

export const sendAllyEmail = async (orderByAlly: IOrderExtended): Promise<number> => {
  const allyItems = orderByAlly.line_items_by_ally;
  const emailPromises: Promise<boolean>[] = [];

  allyItems.forEach((allyItem) => {
    const productsData = allyItem;
    const email = allyEmailTemplate(orderByAlly, productsData);
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
};