import CommerceLayer from '@commercelayer/sdk';
import Cookies from "js-cookie";
import { getIntegrationToken, getSalesChannelToken } from "@commercelayer/js-auth";

export interface ICustomer {
  name: string;
  lastName: string;
  documentType: string;
  documentNumber: string;
  email: string;
  cellPhone: string;
  password: string;
  confirmPassword?: string;
  contractNumber: string;
  authorize: boolean;
  notificate: boolean;
}

export const getAppToken = async () => {
  let token = "";
  const getCookieToken = Cookies.get("clIntegrationToken");
  if (!getCookieToken && process.env.COMMERCELAYER_CLIENT_ID && process.env.COMMERCELAYER_CLIENT_SECRET && process.env.COMMERCELAYER_ENDPOINT) {
    const auth = await getIntegrationToken({
      endpoint: process.env.COMMERCELAYER_ENDPOINT,
      clientId: process.env.COMMERCELAYER_CLIENT_ID,
      clientSecret: process.env.COMMERCELAYER_CLIENT_SECRET
    });
    token = auth.accessToken;
    Cookies.set("clIntegrationToken", token, {
      expires: auth.expires
    });
  } else {
    token = getCookieToken || "";
  }
  return token;
};

export const getMerchantToken = async () => {
  let token = '';

  const { accessToken } = await getSalesChannelToken({
    endpoint: process.env.NEXT_PUBLIC_COMMERCELAYER_ENDPOINT,
    clientId: process.env.NEXT_PUBLIC_COMMERCELAYER_CLIENT_ID,
    scope: process.env.NEXT_PUBLIC_COMMERCELAYER_MARKET_SCOPE,
  });

  if (accessToken) {
    token = accessToken;
  }

  return token;
};

const getCommerlayerClient = async (token) => CommerceLayer({
  organization: 'vanti-poc',
  accessToken: token,
});

export const createCustomer = async ({
  email,
  password,
  name,
  lastName,
  documentType,
  documentNumber,
  cellPhone,
  contractNumber,
  authorize,
  notificate
}: ICustomer) => {
  try {
    const merchantToken = await getMerchantToken();
    const cl = await getCommerlayerClient(merchantToken);

    const createCustomer = await cl.customers.create({
      email: email,
      password: password,
      metadata: {
        name: name,
        lastName: lastName,
        documentType: documentType,
        documentNumber: documentNumber,
        cellPhone: cellPhone,
        contractNumber: contractNumber,
        privacyPolicy: authorize,
        notifications: notificate,
      }
    });
    return { status: 201, ...createCustomer }; // this will return the created resource object

  } catch (error) {
    console.error('Error - Customer Service: ', error.response);
    return { status: error.response.status };
  }
};

export const getCommercelayerProduct = async (skuCode: string) => {
  let product = null;
  try {
    const token = await getMerchantToken();
    const client = await getCommerlayerClient(token);

    const sku = (
      await client.skus.list({
        filters: { code_eq: decodeURI(skuCode) },
        include: ['prices', 'stock_items'],
        fields: ['id', 'prices', 'stock_items'],
      })
    ).first();

    if (sku) {
      product = {
        price: sku?.prices[0]?.formatted_amount,
        priceBefore: sku?.prices[0]?.formatted_compare_at_amount,
        productsQuantity: sku?.stock_items[0]?.quantity
      };
    }
  } catch (error) {
    console.error('Error retrieving SKU: ', error);
  }

  return product;
};
