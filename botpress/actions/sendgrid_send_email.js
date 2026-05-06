/**
 * sendgrid_send_email.js
 */
const sgMail = require('@sendgrid/mail');

module.exports = async function sendEmail({ to, subject, html }, env) {
  sgMail.setApiKey(env.SENDGRID_API_KEY);

  const msg = {
    to,
    from: env.SENDGRID_FROM_EMAIL,
    subject,
    html
  };

  await sgMail.send(msg);
  return { ok: true };
};
