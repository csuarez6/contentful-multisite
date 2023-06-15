import { VANTILISTO_CONSTANTS } from "./constants";

const getToken = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const userData = {
    "username": VANTILISTO_CONSTANTS.USER_NAME,
    "password": VANTILISTO_CONSTANTS.USER_PASSWORD
  };

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(userData),
    redirect: 'follow'
  };

  try {
    const response = await fetch(VANTILISTO_CONSTANTS.URL_TOKEN, requestOptions);
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

const consultQuotaVantilisto = async (body) => {
  const { contractAccount } = body;
  const response = await getToken();
  const { result, token } = response;

  if (!result || !token) {
    const message = navigator.onLine ? "Error de credenciales" : "Error, revisa tu conexión e intenta de nuevo.";
    return { result, message };
  } else {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = {
      account: contractAccount,
      token
    };

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(raw)
    };

    try {
      const response = await fetch(VANTILISTO_CONSTANTS.URL_VANTILISTO_QUOTA, requestOptions);
      const resultJSON = await response.json();

      if (!resultJSON.result) {
        return {
          error: true,
          message: navigator.onLine
            ? (resultJSON.message ?? "¡Error al crear el Callback!")
            : "Error, revisa tu conexión e intenta de nuevo."
        };
      }
      return resultJSON;
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

export default consultQuotaVantilisto;