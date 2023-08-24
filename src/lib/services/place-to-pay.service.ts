import { base64 } from 'base-64';
import { randomBytes } from 'crypto';
import { sha1 } from 'sha1';
import { IPerson } from '../interfaces/IPerson-p2p-cf.interface';
import { IPayment } from '../interfaces/IPayment-p2p-cf.interface';
import { IFields } from '../interfaces/IExtraFields-p2p-cf.interface';
import { IRequestInformation } from '../interfaces/IRequestInformation-p2p-cf.interface';
import { IRequest } from '../interfaces/IRequest-p2p-cf.interface';
import { ICreateRequest } from '../interfaces/ICreateRequest-p2p-cf.interface';
import { IAuth } from '../interfaces/IAuth-p2p-cf.interface';
import { INotification } from '../interfaces/INotification-p2p-cf.interface';

const PLACE_TO_PAY_ENDPOINT = process.env.PLACE_TO_PAY_URL;
const PLACE_TO_PAY_LOGIN = process.env.PLACE_TO_PAY_LOGIN;
const PLACE_TO_PAY_SECRET_KEY = process.env.PLACE_TO_PAY_SECRET_KEY;
const RETURN_URL = process.env.PLACE_TO_PAY_RETURN_URL;

const generateNonce = () => {
  try {
    const nonceBuffer = randomBytes(16);
    return nonceBuffer.toString('hex');
  } catch (error) {
    console.error('Error generating nonce:', error);
    return Math.random().toString();
  }
};

const generateSeed = () => {
  const current = new Date().toISOString();
  const currentDate = new Date(current);
  currentDate.setMinutes(currentDate.getMinutes() + 2);
  const seed = currentDate.toISOString();
  return seed;
};

const generateTranKey = (nonce: string, seed: string, tranKey: string) => {
  const tranKeyBase64 = base64.encode(sha1(nonce + seed + tranKey, { encoding: 'binary' }));
  return tranKeyBase64;
};

export const getAuth = () => {
  const seed = generateSeed();
  const nonce = generateNonce();
  const tranKeyBase64 = generateTranKey(nonce, seed, PLACE_TO_PAY_SECRET_KEY);
  const nonceBase64 = base64.encode(nonce);

  const authOptions: IAuth = {
    login: PLACE_TO_PAY_LOGIN,
    seed: seed,
    tranKey: tranKeyBase64,
    nonce: nonceBase64,
  };

  return authOptions;
};

export const createRequest = async (buyer: IPerson, payment: IPayment, ipAddress: string, userAgent: string, extraFields?: IFields): Promise<IRequest|string> => {
  const authOptions = getAuth();

  const bodyRequest: ICreateRequest = {
    locale: "es_CO",
    auth: authOptions,
    buyer: buyer,
    payment: payment,
    expiration: new Date(Date.now() + 600 * 1000).toISOString(),
    returnUrl: RETURN_URL,
    ipAddress: ipAddress,
    userAgent: userAgent,
    type: "checkin"
  };

  if (extraFields) {
    bodyRequest.fields = extraFields;
  }

  try {
    const response = await fetch(PLACE_TO_PAY_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(bodyRequest)
    });
    const data = await response.json() as IRequest;
    return data;
  } catch (error) {
    console.error(error);
    if (!navigator.onLine)
      return "Comprueba tu conexión a internet e intenta de nuevo por favor.";
    else
      return `Ocurrió un error al crear la transacción en P2P`;
  }
};

export const getRequestInformation = async (requestId: string): Promise<IRequestInformation|string> => {
  const authOptions = getAuth();

  const bodyRequest = {
    auth: authOptions,
  };

  try {
    const response = await fetch(PLACE_TO_PAY_ENDPOINT + '/' + requestId, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(bodyRequest)
    });
    const data = await response.json() as IRequestInformation;
    return data;
  } catch (error) {
    console.error(error);
    if (!navigator.onLine)
      return "Comprueba tu conexión a internet e intenta de nuevo por favor.";
    else
      return `Ocurrió un error al consultar la transacción ${requestId} en P2P`;
  }
};

export const validateSignature = (params: INotification): boolean => {
  const createSignature = sha1(
    params.requestId +
    params.status.status +
    params.status.date +
    PLACE_TO_PAY_SECRET_KEY
  );
  
  return (createSignature === params.signature);
};
