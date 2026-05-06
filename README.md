# Berger Mobile Detailing LLC — Autonomous Ops System

> **99% autonomous** omni-channel customer communication, booking, reputation management, and analytics stack for a premium mobile car detailing company serving the DMV region (Northern Virginia, Washington DC, Maryland).

---

## Repository Structure

```
├── docs/                    # Knowledge base, system prompt, setup guides, runbook
├── data/                    # Pricing matrices, add-ons, zones, vehicle class maps
├── botpress/                # AI chatbot: intents, entities, flows, actions, webchat embed
├── automation/              # Zapier/Make blueprints + SMS/email templates
├── integrations/            # Node.js stubs: Fieldd, Twilio, SendGrid, Stripe, GBP, Yelp
├── analytics/               # GA4 event schemas
├── deployment/              # .env.example + docker-compose skeleton
├── marketing/               # SEO playbook
├── website/                 # Structured data (schema.org)
├── client/                  # React + Vite frontend (partnership proposal site)
├── server/                  # Express static server
└── shared/                  # Shared constants
```

---

## Core Components

### 1. AI Chatbot (Botpress)

| Component | Path | Purpose |
|-----------|------|---------|
| Intents | `botpress/intents/` | Booking, pricing, availability, services, location, cancellation, complaints, reviews, referrals, fallback |
| Entities | `botpress/entities/` | Services, add-ons, vehicles, locations, zones |
| Flows | `botpress/flows/` | Main routing flow + booking flow specs |
| Actions | `botpress/actions/` | Fieldd booking, Twilio SMS, SendGrid email, Stripe invoicing |
| Hooks | `botpress/hooks/` | Pre-incoming escalation detection |
| Webchat | `botpress/webchat/` | Embed snippet + custom styles |
| Config | `botpress/bot.config.json` | Bot metadata and channel list |

### 2. Knowledge Base & Operational Rules

| Document | Path | Purpose |
|----------|------|---------|
| Full KB | `docs/KB_FULL.txt` | Complete knowledge base (8000+ lines) |
| Blueprint | `docs/KB_BLUEPRINT_ONLY.md` | Master blueprint with all module specs |
| System Prompt | `docs/SYSTEM_PROMPT.txt` | Canonical AI operational rules |
| Architecture | `docs/ARCHITECTURE.md` | High-level system architecture |
| Setup Guide | `docs/SETUP.md` | Practical setup checklist |
| Runbook | `docs/RUNBOOK.md` | Daily/weekly/monthly operational cadence |
| Unverified | `docs/UNVERIFIED_CHECKLIST.md` | Go-live blockers requiring confirmation |

### 3. Data Layer

| File | Purpose |
|------|---------|
| `data/pricing_matrix.json` | Service prices by vehicle class with durations |
| `data/addons_matrix.json` | Add-on pricing, durations, margins |
| `data/location_zones.json` | Blue/Green/Red zone definitions + travel fees |
| `data/vehicle_class_map.json` | Vehicle class ID → pricing key mapping |
| `data/services_catalog_fieldd_2026-01-03.json` | Fieldd-exported service catalog |
| `data/addons_catalog_fieldd_2026-01-03.json` | Fieldd-exported add-ons catalog |

### 4. Automation & Templates

| File | Purpose |
|------|---------|
| `automation/zaps/new_booking_confirmation.json` | Booking → SMS + Email + Calendar |
| `automation/zaps/job_complete_review_request.json` | Job complete → 24h delay → Review request |
| `automation/templates/sms_templates.json` | SMS message templates |
| `automation/templates/email_templates/` | HTML email templates |

### 5. Integrations

| Integration | Path | Purpose |
|-------------|------|---------|
| Fieldd | `integrations/fieldd/api_client.js` | Booking system API client |
| Google Business Profile | `integrations/google_business_profile/review_reply.js` | Auto-reply to reviews |
| Yelp | `integrations/yelp/review_monitor.js` | Monitor Yelp reviews |

### 6. Analytics & Marketing

| File | Purpose |
|------|---------|
| `analytics/ga4_events.json` | GA4 event schemas (chat_start, quote_generated, booking_link_shared, booking_completed, escalation_triggered) |
| `marketing/SEO_PLAYBOOK.md` | Local SEO + SGE strategy for DMV |
| `website/seo/structured_data.json` | Schema.org FAQPage structured data |

---

## Core Rules (Must Never Be Violated)

1. **ZERO GUESSING** — Never invent pricing, fees, or durations
2. **Exact quotes only** when `service_id` + `vehicle_class_id` + `location_zone_id` are ALL known and pricing exists in registry
3. **Always escalate** — Damage claims, refunds/chargebacks, legal threats, medical/mold concerns, biohazard uncertainty, insurance claims
4. **No card numbers in chat**
5. **No exact arrival promises** — Give a time window only

---

## Service Area & Zones

| Zone | Travel Fee | Coverage |
|------|-----------|----------|
| Blue (Core DMV) | $0 | DC, Arlington, Alexandria, McLean, Fairfax, Springfield, Woodbridge, Manassas, Centreville, Chantilly, Reston, Great Falls, Bethesda, Rockville, College Park, Bowie, Waldorf |
| Green (Extended) | $50 | Germantown, Gaithersburg, Olney, Laurel, Odenton, Crofton, Leonardtown, Lexington Park |
| Red (Western VA) | $50 | Leesburg, Ashburn, Gainesville, Haymarket, Stafford, Fredericksburg |

---

## Pricing Overview

### Core Services

| Service | Sedan/Coupe | SUV 5-Seat | 3-Row/Minivan | Truck | Large Van |
|---------|-------------|------------|---------------|-------|-----------|
| Diamond Interior Detail | $199 | $199 | $249 | $249 | $299 |
| Diamond Exterior Detail | $179 | $179 | $199 | $199 | $299 |
| VIP Full Detail | $299 | $299 | $399 | $399 | $499 |
| Presidential Full Detail | $649 | $649 | $749 | $749 | $999 |
| Engine Detail | $149 | $149 | $149 | $149 | $149 |
| Ozone Odor Removal | $99 | $99 | $99 | $99 | $99 |
| Vomit Removal | $199 | $199 | $199 | $199 | $199 |

### Ceramic Coatings

| Service | Sedan/Coupe | SUV 5-Seat | 3-Row/Minivan | Truck | Large Van |
|---------|-------------|------------|---------------|-------|-----------|
| 1-Year | $399 | $399 | $499 | $499 | $599 |
| 4-Year | $1,199 | $1,199 | $1,499 | $1,499 | $1,749 |
| 7-Year | $1,799 | $1,799 | $1,999 | $1,999 | $2,299 |
| Lifetime | $2,299 | $2,299 | $2,499 | $2,499 | $2,999 |

### Paint Correction

| Service | Sedan/Coupe | SUV 5-Seat | 3-Row/Minivan | Truck | Large Van |
|---------|-------------|------------|---------------|-------|-----------|
| Stage 1 | $499 | $499 | $699 | $699 | $999 |
| Stage 2 | $999 | $999 | $1,399 | $1,399 | $1,999 |
| Stage 3 | $1,499 | $1,499 | $1,999 | $1,999 | $2,999 |

---

## Quick Start

1. Clone this repository
2. Copy `deployment/.env.example` to `.env` and fill in credentials
3. Follow `docs/SETUP.md` for step-by-step deployment
4. Import Botpress intents/entities from `botpress/`
5. Configure automation workflows from `automation/zaps/`
6. See `docs/RUNBOOK.md` for ongoing operations

---

## Environment Variables Required

```
BOTPRESS_BOT_ID, BOTPRESS_CLIENT_ID
FIELDD_BASE_URL, FIELDD_API_KEY
TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER
SENDGRID_API_KEY, SENDGRID_FROM_EMAIL
STRIPE_SECRET_KEY
GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET, GOOGLE_GBP_LOCATION_NAME
YELP_API_KEY, YELP_BUSINESS_ID
```

---

## Booking Link

**https://bergermobiledetailingllc.fieldd.co**

---

## License

Proprietary — Berger Mobile Detailing LLC. All rights reserved.
