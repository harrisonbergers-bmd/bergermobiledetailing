/**
 * fieldd_create_booking.js
 * Creates a booking/job in Fieldd when API credentials are available.
 */
const axios = require('axios');

module.exports = async function fielddCreateBooking(payload, env) {
  const baseUrl = env.FIELDD_BASE_URL;
  const apiKey  = env.FIELDD_API_KEY;
  if (!baseUrl || !apiKey) {
    return { ok: false, reason: "missing_fieldd_credentials" };
  }

  const url = `${baseUrl}/jobs`;
  const headers = { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" };

  const res = await axios.post(url, payload, { headers });
  return { ok: true, data: res.data };
};
