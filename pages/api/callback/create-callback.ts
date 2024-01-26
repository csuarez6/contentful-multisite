import { CALLBACK_TYPES, GENESYS_CONSTANTS } from "./constants";

const getType = (type: string) => CALLBACK_TYPES[type.toLocaleLowerCase()] ?? type;

const getToken = async () => {
  const myHeaders = new Headers();
  myHeaders.append("grand_type", "client_credentials");
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append('Authorization', 'Basic ' + Buffer.from(GENESYS_CONSTANTS.CLIENT_ID + ":" + GENESYS_CONSTANTS.CLIENT_SECRET).toString('base64'));

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  };

  try {
    const response = await fetch(GENESYS_CONSTANTS.URL_TOKEN, requestOptions);
    const result = await response.json();
    return result;
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.info('There was a SyntaxError', error);
    } else {
      console.info('There was an error', error);
    }

    return {
      error
    };
  }
};

const createCallback = async (body) => {
  const { type, contractAccount, email, fullName, cellPhone, productName, priceVantiListo, priceGasodomestico, campaign, callbackId } = body;
  const { typeName, queueId } = getType(type);
  const response = await getToken();
  const { access_token, error } = response;
  console.info(response);

  if (error) {
    const message = error === "invalid_client"
      ? "Error de credenciales"
      : response.description;

    return { error, message };
  } else {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${access_token}`);

    const campaignName = campaign ? ` - ${campaign}` : "";
    const _productName = `${productName}${campaignName}`;

    const raw = {
      "scriptId": GENESYS_CONSTANTS.SCRIPT_ID,
      "routingData": {
        "queueId": queueId,
        "preferredAgentIds": [
          ""
        ]
      },
      "callbackNumbers": [
        cellPhone
      ],
      "callbackScheduledTime": "",
      "countryCode": "CO",
      "validateCallbackNumbers": false,
      "data": {
        "numero_de_contacto": cellPhone ?? "",
        "nombre_cliente": fullName ?? "",
        "apellido_cliente": "",
        "mail": email ?? "",
        "tratamiento_datos": "Acepto",
        "url_del_producto": _productName ?? "",
        "precio_del_producto": priceVantiListo ?? priceGasodomestico ?? "",
        "origen": typeName ?? "",
        "cuenta_contrato": contractAccount ?? "",
        "sociedad": "",
        "ticket": "",
        "oportunidad": callbackId ?? "",
        "mercado": "",
        "servicio": "",
      }
    };

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(raw),
      redirect: 'follow'
    };

    console.info("data:", JSON.stringify(raw));

    try {
      const response = await fetch(GENESYS_CONSTANTS.URL_CALLBACK, requestOptions);
      const result = await response.json();

      if (result.status === 401 || result.errors) {
        return {
          error: true,
          message: result.message ?? "¡Error al crear el Callback! Intente de nuevo más tarde por favor."
        };
      }
      return result;
    } catch (error) {
      if (error instanceof SyntaxError) {
        console.info('There was a SyntaxError', error);
      } else {
        console.info('There was an error', error);
      }

      return {
        error
      };
    }
  }
};

export default createCallback;
