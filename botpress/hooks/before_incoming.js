/**
 * before_incoming.js
 * Normalize input, detect escalation triggers, set channel rules.
 */
module.exports = async function beforeIncoming(event, kb) {
  const text = (event.text || "").toLowerCase();

  const escalationTriggers = [
    "refund", "chargeback", "dispute", "lawyer", "sue", "injury", "hospital",
    "mold sick", "breathing", "biohazard", "needle", "blood", "insurance", "damage", "scratched"
  ];

  const hit = escalationTriggers.find(t => text.includes(t));
  if (hit) {
    event.flags = event.flags || {};
    event.flags.escalation_required = true;
    event.flags.escalation_trigger = hit;
  }

  return event;
};
