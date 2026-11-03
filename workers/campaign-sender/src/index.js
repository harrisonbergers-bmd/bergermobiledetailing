import detail10 from "../campaigns/detail10.json";

const CAMPAIGNS = { [detail10.id]: detail10 };

export default {
  async fetch(req, env, ctx) {
    const url = new URL(req.url);
    const c = CAMPAIGNS[env.CAMPAIGN_ID];
    if (!c) return text("No campaign configured", 500);

    if (url.pathname === "/" && req.method === "GET") return page(await preview(c, env));
    if (url.pathname === "/status") return json(await status(c, env));

    if (url.pathname === "/approve" && req.method === "POST") {
      if (!(await authorized(req, env))) return text("Forbidden", 403);
      const state = await getState(c, env);
      if (state.approved) return json({ ok: true, alreadyApproved: true, ...state });
      await putState(c, env, { ...state, approved: true, approvedAt: new Date().toISOString(), cursor: null, done: false });
      ctx.waitUntil(runBatch(c, env, url.origin));
      return json({ ok: true, approved: true, message: "Scheduling started. Poll /status." });
    }

    if (url.pathname === "/run" && req.method === "POST") {
      if (!(await authorized(req, env))) return text("Forbidden", 403);
      ctx.waitUntil(runBatch(c, env, url.origin));
      return json({ ok: true });
    }

    return text("Not found", 404);
  },
};

// ---------- audience ----------
function filters(c) {
  const f = [
    { field: "tags", operator: "eq", value: c.audience.includeTag },
    { field: "dnd", operator: "eq", value: false },
  ];
  if (c.audience.excludeTag) f.push({ field: "tags", operator: "not_eq", value: c.audience.excludeTag });
  for (const t of c.audience.requireTags || []) f.push({ field: "tags", operator: "eq", value: t });
  return f;
}

async function searchPage(c, env, searchAfter) {
  const body = {
    locationId: env.GHL_LOCATION_ID,
    filters: filters(c),
    sort: [{ field: "dateAdded", direction: "asc" }],
    pageLimit: Number(env.BATCH_SIZE) || 50,
  };
  if (searchAfter) body.searchAfter = searchAfter;
  const r = await ghl(env, "/contacts/search", { method: "POST", body: JSON.stringify(body) });
  return r;
}

// ---------- send ----------
async function runBatch(c, env, origin) {
  const state = await getState(c, env);
  if (!state.approved || state.done) return;

  const pageData = await searchPage(c, env, state.cursor);
  const contacts = pageData.contacts || [];
  const ts = Math.floor(new Date(c.scheduledAt).getTime() / 1000);
  let sent = state.sent || 0, skipped = state.skipped || 0, failed = state.failed || 0;

  for (const ct of contacts) {
    if (!ct.phone) { skipped++; continue; }
    const key = `${c.id}:${ct.id}`;
    if (await env.SENT_LOG.get(key)) { skipped++; continue; }
    const payload = { type: "SMS", contactId: ct.id, message: c.message, scheduledTimestamp: ts };
    if (c.mms && c.mediaUrl) payload.attachments = [c.mediaUrl];
    try {
      const res = await ghl(env, "/conversations/messages", { method: "POST", body: JSON.stringify(payload) });
      await env.SENT_LOG.put(key, JSON.stringify({ at: Date.now(), messageId: res.messageId || null }), { expirationTtl: 60 * 60 * 24 * 90 });
      sent++;
    } catch (e) {
      failed++;
      await env.SENT_LOG.put(`${c.id}:fail:${ct.id}`, String(e).slice(0, 500), { expirationTtl: 60 * 60 * 24 * 30 });
    }
    await sleep(120); // GHL burst limit: 100 req / 10 s
  }

  const last = contacts[contacts.length - 1];
  const done = contacts.length < (Number(env.BATCH_SIZE) || 50) || !last?.searchAfter;
  await putState(c, env, { ...state, sent, skipped, failed, cursor: last?.searchAfter || null, done, lastRunAt: new Date().toISOString() });

  if (!done) {
    await fetch(`${origin}/run`, { method: "POST", headers: { authorization: `Bearer ${env.APPROVAL_TOKEN}` } });
  }
}

// ---------- state ----------
const stateKey = (c) => `${c.id}:state`;
async function getState(c, env) { return (await env.SENT_LOG.get(stateKey(c), "json")) || { approved: false, sent: 0, skipped: 0, failed: 0, cursor: null, done: false }; }
async function putState(c, env, s) { await env.SENT_LOG.put(stateKey(c), JSON.stringify(s)); }

async function status(c, env) {
  const s = await getState(c, env);
  return { campaign: c.id, scheduledAt: c.scheduledAt, ...s };
}

async function preview(c, env) {
  const first = await searchPage(c, env, null).catch(() => ({ total: null }));
  const s = await getState(c, env);
  return { c, total: first.total ?? null, state: s };
}

// ---------- helpers ----------
async function authorized(req, env) {
  const h = req.headers.get("authorization") || "";
  const form = req.headers.get("content-type")?.includes("form") ? await req.clone().formData().catch(() => null) : null;
  const t = h.replace(/^Bearer\s+/i, "") || form?.get("token") || "";
  return !!env.APPROVAL_TOKEN && t === env.APPROVAL_TOKEN;
}

async function ghl(env, path, init) {
  const r = await fetch(env.GHL_API_BASE + path, {
    ...init,
    headers: { authorization: `Bearer ${env.GHL_TOKEN}`, version: env.GHL_API_VERSION, "content-type": "application/json", accept: "application/json", ...(init.headers || {}) },
  });
  const body = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(`GHL ${r.status} ${path}: ${JSON.stringify(body).slice(0, 300)}`);
  return body;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const text = (b, status = 200) => new Response(b, { status, headers: { "content-type": "text/plain" } });
const json = (b, status = 200) => new Response(JSON.stringify(b, null, 2), { status, headers: { "content-type": "application/json" } });

function page({ c, total, state }) {
  const esc = (s) => String(s).replace(/[&<>"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]));
  const when = new Date(c.scheduledAt).toLocaleString("en-US", { timeZone: "America/New_York", dateStyle: "full", timeStyle: "short" });
  const btn = state.approved
    ? `<p class="ok">Approved ${esc(state.approvedAt)} · scheduled ${state.sent} · skipped ${state.skipped} · failed ${state.failed}${state.done ? " · complete" : " · running…"}</p>`
    : `<form method="post" action="/approve"><input name="token" placeholder="Approval token" required><button>Approve &amp; schedule ${total ?? "?"} messages</button></form>`;
  return new Response(`<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(c.name)}</title>
<style>body{font-family:-apple-system,system-ui,sans-serif;background:#111;color:#eee;margin:0;padding:24px;display:flex;justify-content:center}main{max-width:420px;width:100%}h1{font-size:18px;margin:0 0 16px}.card{background:#e9e9eb;color:#1c1c1e;border-radius:18px;overflow:hidden}.card img{display:block;width:100%}.body{padding:14px;font-size:15px;line-height:1.4;white-space:pre-wrap}dl{font-size:14px;color:#bbb;margin:16px 0}dt{color:#777;font-size:12px;text-transform:uppercase;letter-spacing:.04em}dd{margin:2px 0 10px;color:#eee}form{display:flex;gap:8px}input{flex:1;padding:12px;border-radius:10px;border:1px solid #444;background:#1c1c1e;color:#eee}button{padding:12px 16px;border-radius:10px;border:0;background:#0a84ff;color:#fff;font-weight:600}.ok{color:#9fe1cb}</style>
<main><h1>${esc(c.name)}</h1>
<div class="card">${c.mms && c.mediaUrl ? `<img src="${esc(c.mediaUrl)}" alt="">` : ""}<div class="body">${esc(c.message)}</div></div>
<dl><dt>Audience</dt><dd>${total ?? "unavailable"} contacts · tag ${esc(c.audience.includeTag)}, minus ${esc(c.audience.excludeTag || "—")}, not DND</dd>
<dt>Sends</dt><dd>${esc(when)} ET · ${c.mms ? "MMS with image" : "SMS"} via GoHighLevel</dd></dl>
${btn}
<p style="color:#777;font-size:12px">Nothing is sent until the button is pressed. Status: <a style="color:#9fe1cb" href="/status">/status</a></p></main>`,
    { headers: { "content-type": "text/html; charset=utf-8" } });
}
