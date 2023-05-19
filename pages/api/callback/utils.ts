const VARS = {
  URL: "https://login.mypurecloud.com/oauth/token",
  CLIENT_ID: process.env.GENESYS_CLIENT_ID,
  CLIENT_SECRET: process.env.GENESYS_CLIENT_SECRET
};

const getToken = async () => {
  console.info(VARS);
  const myHeaders = new Headers();
  myHeaders.append("grand_type", "client_credentials");
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append('Authorization', 'Basic ' + Buffer.from(VARS.CLIENT_ID + ":" + VARS.CLIENT_SECRET).toString('base64'));

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  };

  try {
    const response = await fetch(VARS.URL, requestOptions);
    const result = await response.json();
    console.info(result);
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

export {
  getToken,
};
