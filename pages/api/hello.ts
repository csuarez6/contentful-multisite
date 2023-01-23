// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { SMTPClient } from 'emailjs';


type Data = {
  name?: string | string[],
  error?: any,
  message?: any,
  connData?: any,
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const token = req.query.token ?? null;

  if (!token) {
    res.status(200).json({ name: 'John Doe' });
    return;
  }

  console.log(typeof req.query.user);
  const user = req.query.user ? (typeof req.query.user !== 'string' ? req.query.user[0] : req.query.user) : process.env.SMTP_USER;
  const pass = req.query.pass ? (typeof req.query.pass !== 'string' ? req.query.pass[0] : req.query.pass) : process.env.SMTP_PASSWORD;
  const port = req.query.port ? (typeof req.query.port !== 'string' ? req.query.port[0] : req.query.port) : process.env.SMTP_PORT;
  const host = req.query.host ? (typeof req.query.host !== 'string' ? req.query.host[0] : req.query.host) : process.env.SMTP_HOST;
  const ssl = req.query.ssl ? (typeof req.query.ssl !== 'string' ? req.query.ssl[0] : req.query.ssl) : 0;
  const to = req.query.to ? (typeof req.query.to !== 'string' ? req.query.to[0] : req.query.to) : 'bsanchez@aplyca.com';

  const connData = {
    host, port, user, pass, ssl: (ssl == '1' ? true : false), to
  };

  const client = new SMTPClient({
    user,
    password: pass,
    host,
    ssl: ssl == '1' ? true : false,
    port: parseInt(port),
  });

  client.send(
    {
      text: 'i hope this works',
      from: 'Aplyca Dev <dev@aplyca.com>',
      to: `Brandon <${to}>`,
      subject: 'testing emailjs',
    },
    (err, message) => {
      res.status(200).json({ connData, message, error: err });
    }
  );
}
