import CommerceLayer from '@commercelayer/sdk';
import Cookies from "js-cookie";
import { getIntegrationToken } from "@commercelayer/js-auth";

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

export const getToken = async () => {
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

const getCommerlayerClient = async () => CommerceLayer({
  organization: 'vanti-poc',
  accessToken: await getToken(),
});

export const createCustomer = async ({ email, password, name, lastname, documentType, document, phone, accountNumber, privacyPolicy, notifications }: ICustomer) => {
  try {
    const cl = await getCommerlayerClient();
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
    console.log(`Customer: ${createCustomer.id} created succefully`);
    return createCustomer; // this will return the created resource object

  } catch (error) {
    console.error('error!! ', error);
  }

};