/**
 * stripe_create_invoice.js
 */
const Stripe = require('stripe');

module.exports = async function createInvoice({ customerEmail, amountCents, description }, env) {
  const stripe = Stripe(env.STRIPE_SECRET_KEY);

  // Create a customer (or lookup by email in your system)
  const customer = await stripe.customers.create({ email: customerEmail });

  // Create invoice item
  await stripe.invoiceItems.create({
    customer: customer.id,
    amount: amountCents,
    currency: 'usd',
    description
  });

  // Create & finalize invoice
  const invoice = await stripe.invoices.create({ customer: customer.id, auto_advance: true });
  const finalized = await stripe.invoices.finalizeInvoice(invoice.id);

  return { ok: true, invoiceId: finalized.id, hostedInvoiceUrl: finalized.hosted_invoice_url };
};
