# Setup Checklist (Practical)

## 1) BotPress (Webchat + Omnichannel)
1. Create/publish the bot in Botpress Cloud.
2. Import the **intents** and **entities** from `/botpress/` (manual copy/paste or builder import).
3. Add the rules in `docs/SYSTEM_PROMPT.txt` to your bot’s global instructions/system prompt.
4. Embed webchat using `/botpress/webchat/botpress_embed.html`.

## 2) Fieldd (Booking + Payments)
1. Confirm the live booking portal is active and branded.
2. If API access is enabled, populate Fieldd credentials in `.env` and use `/integrations/fieldd`.

## 3) Twilio + SendGrid (Transactional messaging)
1. Create a Twilio number + messaging service.
2. Create a SendGrid API key + sender identity.
3. Fill `.env` and test: booking confirmations, reminders, review requests.

## 4) Reviews (Google + Yelp)
1. Enable Google Business Profile API access for review reply automation.
2. Use `/integrations/google_business_profile` and `/integrations/yelp`.

## 5) Analytics
1. Create GA4 property and connect events in `/analytics/ga4_events.json`.
2. Build Looker Studio dashboards using the schemas in `/analytics`.

## 6) QA
Run conversation tests from `/testing/` and confirm:
- no invented pricing
- escalation triggers work
- travel fee routing works
- booking link always offered when user is ready
