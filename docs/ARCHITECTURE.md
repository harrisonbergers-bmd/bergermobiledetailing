# Architecture (High-Level)

**Channels → Router → Knowledge + Policies → Action Layer → Systems of Record**

- Channels: webchat, SMS, email, social DM, GBP messaging, voice
- Router: intent + entity extraction + context memory
- Knowledge: services, add-ons, policies, zones, FAQs, SOP snippets
- Action layer: booking (Fieldd), payments (Stripe/Square), messaging (Twilio/SendGrid), reviews (Google/Yelp)
- Logging: analytics events + escalation payloads + QA flags
