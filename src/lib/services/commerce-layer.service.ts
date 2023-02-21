import CommerceLayer from '@commercelayer/sdk';
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import { getCustomerToken, getIntegrationToken, getSalesChannelToken } from "@commercelayer/js-auth";

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

export interface JWTProps {
  organization: {
    slug: string
    id: string
  }
  application: {
    kind: string
  }
  owner?: {
    id?: string
  }
  test: boolean
}

export const getAppToken = async (): Promise<string> => {

  try {
    let token = Cookies.get("clIntegrationToken");

    if (!token) {
      const auth = await getIntegrationToken({
        endpoint: process.env.COMMERCELAYER_ENDPOINT,
        clientId: process.env.COMMERCELAYER_CLIENT_ID,
        clientSecret: process.env.COMMERCELAYER_CLIENT_SECRET,
      });
      token = auth.accessToken;
      Cookies.set("clIntegrationToken", token, {
        expires: auth.expires,
      });
    }

    return token;

  } catch (error) {
    throw new Error("UNABLE_GETTING_CL_TOKEN", { cause: error });
  }
};

export const getMerchantToken = async () => {
  try {
    let commercelayerScope = process.env.NEXT_PUBLIC_COMMERCELAYER_MARKET_SCOPE;
    if (commercelayerScope.indexOf('[') === 0) {
      commercelayerScope = JSON.parse(commercelayerScope);
    }

    const { accessToken } = await getSalesChannelToken({
      endpoint: process.env.NEXT_PUBLIC_COMMERCELAYER_ENDPOINT,
      clientId: process.env.NEXT_PUBLIC_COMMERCELAYER_CLIENT_ID,
      scope: commercelayerScope,
    });

    return accessToken;
  } catch (error) {
    console.error(error);

    return '';
  };
};

export const getCustomerTokenCl = async ({ email, password }) => {

  try {
    let commercelayerScope = process.env.NEXT_PUBLIC_COMMERCELAYER_MARKET_SCOPE;
    if (commercelayerScope.indexOf('[') === 0) {
      commercelayerScope = JSON.parse(commercelayerScope);
    }

    const token = await getCustomerToken(
      {
        endpoint: process.env.NEXT_PUBLIC_COMMERCELAYER_ENDPOINT,
        clientId: process.env.NEXT_PUBLIC_COMMERCELAYER_CLIENT_ID,
        scope: commercelayerScope,
      },
      {
        username: email,
        password
      }
    );

    return { status: 200, ...token.data };
  } catch (error) {
    console.log("Error - getCustomerTokenCl: ", error);
    return { status: 400, error: error.message };
  }
};

const getCommerlayerClient = async (accessToken: string) =>
  CommerceLayer({
    organization: "vanti-poc",
    accessToken,
  });

export const getCLAdminCLient = async () => {
  try {
    const accessToken = await getAppToken();

    return getCommerlayerClient(accessToken);
  } catch (error) {
    throw new Error("UNABLE_GETTING_CL_CLIENT", { cause: error });
  }
};

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

export const getCustomerInfo = async (accessToken: string) => {
  try {
    const cl = await getCommerlayerClient(accessToken);
    const { owner } = jwtDecode(accessToken) as JWTProps;
    const customerID = owner?.id;
    const customerInfo = await cl.customers.retrieve(customerID);
    return { status: 200, data: customerInfo };
  } catch (error) {
    console.error('Error customerInfo: ', error);
    return { status: 401, error: error };
  }
};

/** Create a customer password reset */
export const createCustomerResetPwd = async (customerEmail: string) => {
  try {
    console.log("************** createCustomerResetPwd");
    const cl = await getCLAdminCLient();
    const createCustomerRPwd = await cl.customer_password_resets.create({
      customer_email: customerEmail
    });
    console.log({ createCustomerRPwd });
    return { status: 200, data: createCustomerRPwd };
  } catch (error) {
    console.error('Error Create Customer Reset: ', error);
    return { status: 401, error: error };
  }
};

/** Update a customer password reset */
export const updateCustomerResetPwd = async (tokenID: string, customerPWD: string, resetToken: string) => {
  try {
    console.log("************** UpdateCustomerResetPwd");
    const cl = await getCLAdminCLient();
    const updateCustomerRPwd = await cl.customer_password_resets.update({
      id: tokenID,
      customer_password: customerPWD,
      _reset_password_token: resetToken
    });
    console.log({ updateCustomerRPwd });
    return { status: 200, data: updateCustomerRPwd };
  } catch (error) {
    console.error('Error Update Customer Reset: ', error);
    return { status: 401, error: error };
  }
};

/** Retrieve a customer password reset */
export const retrieveCustomerResetPwd = async (tokenID: string) => {
  try {
    let isTokenValid = false;
    console.log("************** RetrieveCustomerResetPwd");
    const cl = await getCLAdminCLient();
    const retrieveCustomerRPwd = await cl.customer_password_resets.retrieve(tokenID);
    console.log({ retrieveCustomerRPwd });
    if (retrieveCustomerRPwd.reset_password_at == null) { //tambien se debe validar el tiempo del token
      isTokenValid = true;
    }
    return { status: 200, isTokenValid, resetToken: retrieveCustomerRPwd.reset_password_token, tokenID };
  } catch (error) {
    console.error('Error Check Customer Token: ', error);
    return { status: 401, error: error };
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
        productsQuantity: sku?.stock_items[0]?.quantity,

        _price: sku?.prices[0]?.amount_float,
        _priceBefore: sku?.prices[0]?.compare_at_amount_float,
      };
    }
  } catch (error) {
    console.error('Error retrieving SKU: ', error);
  }

  return product;
};
