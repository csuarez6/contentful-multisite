import type { NextApiRequest, NextApiResponse } from "next";
import { getCLAdminCLient } from "@/lib/services/commerce-layer.service";
import { sendEmail } from "@/lib/services/mailer.service";

//function emailTemplate temp - only demo
const emailTemplate = (data) => {
  const header = `<!DOCTYPE html>
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
  const footer = `<tr>
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
                  ¡Tu orden ha sido aprobada!
                </h2>
                <img class="sm-w-6" src="https://images.ctfassets.net/3brzg7q3bvg1/1cAtkwe1dXM9ckG06i0gx3/f88616d9c9e899db5a8bc7dd3960bdb0/icon-check.png" alt style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0; float: right">
              </td>
            </tr>
            <tr>
              <td style="padding: 24px">
              <table style="width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td class="sm-inline-block sm-w-full" style="width: 50%; padding-top: 8px; padding-bottom: 8px">Cuenta contrato:</td>
                <td class="sm-inline-block sm-w-full sm-mb-2 sm-pt-0" style="width: 50%; padding-top: 8px; padding-bottom: 8px; font-weight: 500">`+ data.customer?.metadata?.contractNumber + `</td>
              </tr>
              <tr>
                <td class="sm-inline-block sm-w-full" style="width: 50%; padding-top: 8px; padding-bottom: 8px">Nombre del adquiriente:</td>
                <td class="sm-inline-block sm-w-full sm-mb-2 sm-pt-0" style="width: 50%; padding-top: 8px; padding-bottom: 8px; font-weight: 500">`+ `${data.customer?.metadata?.name} ${data.customer?.metadata?.lastName}` + `</td>
              </tr>
              <tr>
                <td class="sm-inline-block sm-w-full" style="width: 50%; padding-top: 8px; padding-bottom: 8px">Cédula de ciudadanía:</td>
                <td class="sm-inline-block sm-w-full sm-mb-2 sm-pt-0" style="width: 50%; padding-top: 8px; padding-bottom: 8px; font-weight: 500">` + data.customer?.metadata?.documentNumber + `</td>
              </tr>
              <tr>
                <td class="sm-inline-block sm-w-full" style="width: 50%; padding-top: 8px; padding-bottom: 8px">Método de pago:</td>
                <td class="sm-inline-block sm-w-full sm-mb-2 sm-pt-0" style="width: 50%; padding-top: 8px; padding-bottom: 8px; font-weight: 500">PSE</td>
              </tr>
              <tr>
                <td class="sm-inline-block sm-w-full" style="width: 50%; padding-top: 8px; padding-bottom: 8px">Entidad Bancária:</td>
                <td class="sm-inline-block sm-w-full sm-mb-2 sm-pt-0" style="width: 50%; padding-top: 8px; padding-bottom: 8px; font-weight: 500">Banco Davivienda</td>
              </tr>
              <tr>
                <td class="sm-inline-block sm-w-full" style="width: 50%; padding-top: 8px; padding-bottom: 8px">Dirección de envío:</td>
                <td class="sm-inline-block sm-w-full sm-mb-2 sm-pt-0" style="width: 50%; padding-top: 8px; padding-bottom: 8px; font-weight: 500">Carrera 12 D # 13 -23 , Bogota</td>
              </tr>
              <tr>
                <td class="sm-inline-block sm-w-full" style="width: 50%; padding-top: 8px; padding-bottom: 8px">Dirección de facturación:</td>
                <td class="sm-inline-block sm-w-full sm-mb-2 sm-pt-0" style="width: 50%; padding-top: 8px; padding-bottom: 8px; font-weight: 500">Carrera 12 D # 13 -23 , Bogota</td>
              </tr>
              <tr>
                <td class="sm-inline-block sm-w-full" style="width: 50%; padding-top: 8px; padding-bottom: 8px">Método de envío:</td>
                <td class="sm-inline-block sm-w-full sm-mb-2 sm-pt-0" style="width: 50%; padding-top: 8px; padding-bottom: 8px; font-weight: 500">Estandar</td>
              </tr>
              </table>
              </td>
            </tr>
            <tr>
              <td style="padding-left: 16px; padding-right: 16px;">
                <h3 style="margin: 0; font-size: 20px; color: #113455">
                  Detalle de tu pedido
                </h3>
              </td>
            </tr>
            <tr>
              <td style="padding-left: 24px; padding-right: 24px; padding-bottom: 24px">` +
    `<table style="width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                    <td class="sm-inline-block sm-w-1-4 sm-border-0" style="width: 54px; border: solid #e9e9e9; border-width: 0px 0px 1px; padding-top: 20px; padding-bottom: 20px; vertical-align: top">
                      <img src="https://images.ctfassets.net/3brzg7q3bvg1/7waNhvZiCtQ8O8UFTAQEaM/d123be92587606737af8e2d33f7d3ae5/media.png" alt style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0;">
                    </td>
                    <td class="sm-inline-block sm-w-3-4 sm-px-0 sm-border-0" style="border: solid #e9e9e9; border-width: 0px 0px 1px; padding: 20px; vertical-align: top; font-weight: 500">
                      <p class="sm-text-12px" style="margin: 0; font-size: 16px; font-weight: 500; color: #000">Calefactor de torre Cuadrado Tecnocalor</p>
                      <ul class="sm-text-12px" style="margin-bottom: 0; margin-top: 4px; list-style-type: none; padding: 0; font-size: 13px">
                        <li>* IVA incluido</li>
                        <li>Cantidad: 1</li>
                      </ul>
                    </td>
                    <td class="sm-inline-block sm-pt-0 sm-clear-both sm-w-full" style="width: 160px; border: solid #e9e9e9; border-width: 0px 0px 1px; padding-top: 20px; padding-bottom: 20px; text-align: right; vertical-align: top">
                      <b style="font-weight: 700; color: #113455">
                        $450.000
                      </b>
                    </td>
                  </tr>
                </table>` +

    `<div style="margin-top: 20px; border-radius: 8px; background-color: #EDF5FF; padding: 10px 16px; text-align: center; font-weight: 700; color: #113455">
                  TOTAL <span style="margin-left: 12px;">$450.000</span>
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

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  try {
    const client = await getCLAdminCLient();
    const jsonBody = typeof req.body == 'string' ? JSON.parse(req.body) : req.body;
    const email = emailTemplate(jsonBody);

    const clientEmail = {
      to: jsonBody.customer.email,
      subject: "Confirmación orden - Vanti",
      message: "Body-email",
      from: "Vanti info <dev@aplyca.com>",
      messageHtml: email
    };

    const isMailSended = await sendEmail(clientEmail.to, clientEmail.subject, clientEmail.message, clientEmail.from, clientEmail.messageHtml);
    console.info({ isMailSended });

    const authorizations = await client.authorizations.list({
      filters: {
        token_eq: <string>req.query.token,
      },
      include: ['order'],
    });

    if (!authorizations.length) throw new Error('INVALID_TRANSACTION');

    const authorization = authorizations.at(0);

    await client.orders.update({
      id: authorization.order.id,
      _approve: true,
    });

    await client.authorizations.update({
      id: authorization.id,
      _capture: true,
    });

    res.json({
      success: true,
      data: {
        transaction_token: authorization.token,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: error.message || 'CAPTURE_PAYMENT_ERROR',
    });
  }
};

export default handler;
