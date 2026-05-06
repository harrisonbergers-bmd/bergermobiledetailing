/**
 * Uses Google Business Profile APIs to list and reply to reviews.
 * See Google docs: https://developers.google.com/my-business/content/review-data
 */
const axios = require('axios');

async function replyToReview({ accessToken, locationName, reviewId, replyText }) {
  const url = `https://mybusiness.googleapis.com/v4/${locationName}/reviews/${reviewId}/reply`;
  const headers = { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" };
  const body = { comment: replyText };
  const res = await axios.put(url, body, { headers });
  return res.data;
}

module.exports = { replyToReview };
