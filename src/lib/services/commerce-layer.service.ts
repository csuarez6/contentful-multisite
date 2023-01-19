import CommerceLayer from '@commercelayer/sdk';
import Cookies from "js-cookie";
import { getIntegrationToken, getSalesChannelToken } from "@commercelayer/js-auth";

export interface ICustomer {
  email: string;
  password: string;
  name: string,
  lastname: string,
  documentType: string,
  document: string,
  phone: string,
  accountNumber: string,
  privacyPolicy: boolean,
  notifications: boolean,
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

export const createCustomer = async ({ email, password, name, lastname, documentType, document, phone, accountNumber, privacyPolicy, notifications }: ICustomer) => {
  try {
    const token = await getAppToken();
    const cl = await getCommerlayerClient(token);

    const createCustomer = await cl.customers.create({
      email: email,
      password: password,
      metadata: {
        name: name,
        lastname: lastname,
        documentType: documentType,
        document: document,
        phone: phone,
        accountNumber: accountNumber,
        privacyPolicy: privacyPolicy,
        notifications: notifications,
      }
    });
    return createCustomer; // this will return the created resource object

  } catch (error) {
    console.error('error!! ', error);
  }
};

export const getCommercelayerProduct = async (skuCode: string) => {
  let product = null;
  try {
    const token = await getMerchantToken();
    const client = await getCommerlayerClient(token);

    const sku = (
      await client.skus.list({
        filters: { code_eq: skuCode },
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
