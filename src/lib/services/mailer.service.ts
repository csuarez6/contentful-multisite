import sgMail from '@sendgrid/mail';

//eslint-disable-next-line
export const sendEmail = async (to: string, subject: string, message: string, from = 'Aplyca Dev <dev@aplyca.com>', messageHtml?: any): Promise<boolean> => {

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to,
    from: process.env.SENDGRID_EMAIL_SENDER ?? 'marketplace@grupovanti.com',
    subject,
    text: message,
    html: messageHtml,
  };

  try {
    await sgMail.send(msg)
      .then(() => {
        console.info('Email sent');
      });
  } catch (err) {
    console.error('Error sending email', err);
    return false;
  }

  return true;
};
