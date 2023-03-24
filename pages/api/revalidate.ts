import { NextApiRequest, NextApiResponse } from 'next';

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const secret = process.env.REVALIDATE_SECRET_TOKEN;
  const tokenHeader = req.headers['x-cf-revalidate-secret-token'];

  if (secret !== tokenHeader) {
    return res.status(403).json({ message: 'Invalid token' });
  }

  if (!req.body) {
    return res.status(400).send({ message: 'Bad request (no body)' });
  }

  const jsonBody = typeof req.body == 'string' ? JSON.parse(req.body) : req.body;
  const route = jsonBody.parameters.urlPath.es;

  try {
    await res.revalidate(route);
  } catch (e) {
    return res.status(500).send({ message: `Revalidating route «${route}» failed: ${e.message}`, revalidated: false });
  }

  return res.status(200).send({ message: `Revalidating route «${route}» success!`, revalidated: true });
};

export default handle;
