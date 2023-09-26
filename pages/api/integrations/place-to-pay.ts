import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (req.method !== "GET")
    return res.status(405).json({ error: "Method not allowed" });
  try {
    placeToPay()
      .then((result) => {
        console.info("resuesta correcta", result);
        return res.status(200).json({ status: 200, data: "esta funcionando" });
      })
      .catch((error) => {
        console.error(error);
        return res
          .status(500)
          .json({ status: "error", message: error.message });
      });
  } catch (e) {
    return res.status(500).json({ status: "error", message: e.message });
  }
};

function placeToPay() {
  const urlPlaceToPay = process.env.PLACE_TO_PAY_ENDPOINT + "/api/session";
  // 'https://placetopay.com/redirection/api/session'; // URL de producción

  const postData = JSON.stringify({
    auth: {
      login: "test",
      tranKey: "test",
      nonce: "test",
      seed: new Date().toISOString(),
    },
  });

  const headers = {
    "Content-Type": "application/json",
    "Content-Length": postData.length.toString(),
  };

  return fetch(urlPlaceToPay, {
    method: "POST",
    headers: headers,
    body: postData,
  })
    .then((response) => {
      const statusCode = response.status;
      if (statusCode === 401) {
        return response.json().then(() => ({
          isValid: "Place to pay service online",
          statusCode: statusCode,
        }));
      } else {
        return {
          isValid: "Service offline",
          statusCode: statusCode,
        };
      }
    })
    .catch((error) => {
      return { error: error.message, statusCode: 500 };
    });
}

export default handler;
