import { SMTPClient } from 'emailjs';

export const sendEmail = async (to: string, subject: string, message: string, from = 'Aplyca Dev <dev@aplyca.com>', messageHtml?: any): Promise<boolean> => {
  const client = new SMTPClient({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD,
    ssl: false
  });

  // ssl: process.env.NODE_ENV == 'production' || process.env.VERCEL_ENV == 'production',

  const attachmentOptions = messageHtml ?
    [
      {
        data: messageHtml,
        alternative: true
      }
    ] : [];

  try {
    await client.sendAsync(
      {
        text: message,
        from,
        to,
        subject,
        attachment: attachmentOptions,
      },
    );
  } catch (err) {
    console.error('Error sending email', err);
    return false;
  }

  return true;
};
