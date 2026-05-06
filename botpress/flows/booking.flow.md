# booking.flow (Spec)

## Required fields
- contact_name
- phone_or_email
- zip_code (→ location_zone_id)
- vehicle_type_id (or year/make/model → mapped)
- service_id
- preferred_time_window

## Steps
1) Confirm service + vehicle + ZIP (ask missing items)
2) Compute travel_fee via zone routing
3) Present exact quote only if pricing exists (service_id + vehicle_type_id + zone known)
4) Offer booking link or (if API enabled) create booking + send confirmation
