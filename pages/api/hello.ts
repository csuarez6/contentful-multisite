// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { SMTPClient } from 'emailjs';


type Data = {
  name?: string | string[],
  error?: any,
  message?: any,
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

  const client = new SMTPClient({
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD,
    host: process.env.SMTP_HOST,
    ssl: false,
    port: parseInt(process.env.SMTP_PORT),
  });

  client.send(
    {
      text: 'i hope this works',
      from: 'Vanti <no-reply@grupovanti.com>',
      to: 'Brandon <bsanchez@aplyca.com>',
      subject: 'testing emailjs',
    },
    (err, message) => {
      res.status(200).json({ message, error: err });
    }
  );
}
