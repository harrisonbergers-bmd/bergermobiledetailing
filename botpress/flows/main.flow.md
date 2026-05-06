# main.flow (Spec)

## Goal
Route every message into one of:
- pricing
- booking
- availability
- service info
- location / service area check
- cancellation/reschedule
- complaint/escalation
- reviews
- referrals
- fallback

## Global pre-check
1) Detect ALWAYS-ESCALATE topics → emergency handoff (no automation)
2) Else extract: service intent, vehicle type, ZIP, time preference, add-ons
3) Route to next best step with **one question at a time**
