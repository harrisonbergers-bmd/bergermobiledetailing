# bmd-campaign-sender

Approve-once, fan-out SMS/MMS campaigns through GoHighLevel from a Cloudflare Worker.

- `campaigns/*.json` — the campaign: text, image, audience tags, send time. Edited by Claude, versioned here.
- `GET /` — preview page with the live audience count and an **Approve** button. Nothing sends before that press.
- `POST /approve` — token-gated. Schedules one GHL message per contact at `scheduledAt`, 50 per batch, self-chaining; idempotent (a contact is never scheduled twice).
- `GET /status` — scheduled / skipped / failed counts.

## Deploy (one time, ~3 minutes)

```bash
cd workers/campaign-sender
npx wrangler login
npx wrangler kv namespace create SENT_LOG        # paste the id into wrangler.toml
npx wrangler secret put GHL_TOKEN                 # GHL → Settings → Private Integrations → scopes: contacts.readonly, conversations/message.write
npx wrangler secret put APPROVAL_TOKEN            # any long random string; it is your approve password
npx wrangler deploy
```

Open the printed `*.workers.dev` URL, check the preview, press **Approve & schedule**.

## Changing a campaign
Edit `campaigns/detail10.json` (or add a new file and point `CAMPAIGN_ID` at it), then `npx wrangler deploy`.
Audience is controlled entirely by GHL tags: add `detail10-exclude` to anyone who should not receive it.
