/**
 * Yelp Fusion API review monitoring (requires Yelp API key).
 */
const axios = require('axios');

async function getReviews({ apiKey, businessId }) {
  const url = `https://api.yelp.com/v3/businesses/${businessId}/reviews`;
  const headers = { Authorization: `Bearer ${apiKey}` };
  const res = await axios.get(url, { headers });
  return res.data;
}

module.exports = { getReviews };
