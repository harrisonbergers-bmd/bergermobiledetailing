/**
 * twilio_send_sms.js
 */
const twilio = require('twilio');

module.exports = async function sendSms({ to, body }, env) {
  const client = twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);
  const from = env.TWILIO_FROM_NUMBER;
  if (!from) return { ok: false, reason: "missing_twilio_from_number" };

  const msg = await client.messages.create({ from, to, body });
  return { ok: true, sid: msg.sid };
};
