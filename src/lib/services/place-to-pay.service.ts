import { createHash } from 'crypto';
import { IP2PAuth, IP2PCreateRequest, IP2PFields, IP2PNotification, IP2PPayment, IP2PPerson, IP2PRequest, IP2PRequestInformation } from '../interfaces/p2p-cf-interface';

const PLACE_TO_PAY_ENDPOINT = process.env.PLACE_TO_PAY_ENDPOINT + '/api/session';
const PLACE_TO_PAY_LOGIN = process.env.PLACE_TO_PAY_LOGIN;
const PLACE_TO_PAY_SECRET_KEY = process.env.PLACE_TO_PAY_SECRET_KEY;
const RETURN_URL = process.env.PLACE_TO_PAY_RETURN_URL;

const generateTranKey = (rawNonce: number, seed: string, secretKey: string) => {
  const tranKeyBase64 = Buffer.from(createHash('sha256').update(rawNonce + seed + secretKey).digest('binary'), 'binary').toString('base64');
  return tranKeyBase64;
};

export const getAuth = () => {
  const seed = new Date().toISOString();
  const rawNonce = Math.floor(Math.random() * 1000000);
  const tranKey = generateTranKey(rawNonce, seed, PLACE_TO_PAY_SECRET_KEY);
  const nonce = Buffer.from(rawNonce.toString()).toString('base64');

  const authOptions: IP2PAuth = {
    login: PLACE_TO_PAY_LOGIN,
    seed: seed,
    tranKey: tranKey,
    nonce: nonce,
  };

  return authOptions;
};

export const createP2PRequest = async (orderId: string, payment: IP2PPayment, ipAddress: string, userAgent: string, extraFields?: IP2PFields[], buyer?: IP2PPerson): Promise<IP2PRequest | string> => {
  const authOptions = getAuth();

  const bodyRequest: IP2PCreateRequest = {
    auth: authOptions,
    payment: payment,
    expiration: new Date(Date.now() + 600 * 1000).toISOString(), // 10 minutes
    ipAddress: ipAddress,
    userAgent: userAgent,
    returnUrl: `${RETURN_URL}/?id=${orderId}`,
    cancelUrl: `${RETURN_URL}/?id=${orderId}`,
    locale: "es_CO"
  };

  if (buyer) {
    bodyRequest.buyer = buyer; // Si se envía este dato, el usuario tendrá sus datos personales pre-diligenciados pero no podrá cambiarlos.
  }

  if (extraFields) {
    bodyRequest.fields = extraFields; // La propiedad fields se usa para almacenar datos estructurados que pueden visualizarse en la interfaz de Checkout según las condiciones indicadas.
  }

  console.info('body', bodyRequest);

  try {

    const response = await fetch(`${PLACE_TO_PAY_ENDPOINT}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(bodyRequest)
    });
    const data = await response.json() as IP2PRequest;
    console.info({ data });
    return data;
  } catch (error) {
    console.error(error);
    return `Ocurrió un error al crear la transacción en P2P`;
  }
};

export const getP2PRequestInformation = async (requestId: string): Promise<IP2PRequestInformation | string> => {
  const authOptions = getAuth();

  const bodyRequest = {
    auth: authOptions,
  };

  try {
    const response = await fetch(`${PLACE_TO_PAY_ENDPOINT}/${requestId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(bodyRequest)
    });
    const data = await response.json() as IP2PRequestInformation;
    console.info({ data });
    return data;
  } catch (error) {
    console.error(error);
    return `Ocurrió un error al consultar la transacción ${requestId} en P2P`;
  }
};

export const validateP2PSignature = (data: IP2PNotification): boolean => {
  const createSignature = createHash('sha1').update(
    data.requestId +
    data.status.status +
    data.status.date +
    PLACE_TO_PAY_SECRET_KEY
  ).digest('hex');

  return (createSignature === data.signature);
};
