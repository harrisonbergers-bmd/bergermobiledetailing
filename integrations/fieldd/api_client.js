const axios = require('axios');

function createClient({ baseUrl, apiKey }) {
  return axios.create({
    baseURL: baseUrl,
    headers: { Authorization: `Bearer ${apiKey}` }
  });
}

module.exports = { createClient };
