# Same-Day Delivery — dedicated page

The announcement bar's info (i) icon links to a page that explains same-day delivery.
Create that page once, then point the theme setting to it.

## 1. Create the page
Shopify Admin → **Online Store → Pages → Add page**
- **Title:** `Same Day Delivery`  (this makes the URL `/pages/same-day-delivery`)
- **Content:** click the **`<>` (Show HTML)** button in the editor and paste the block below.
- **Save.**

## 2. Point the theme setting to it
Online Store → **Customize → Theme settings → Same-Day Delivery Notice → Same-day delivery info page** → pick the **Same Day Delivery** page.
- This automatically swaps the announcement bar's "SHOP NOW" button for the **info icon + tooltip** that opens this page.

## Page content (paste into the page's HTML)

```html
<h2>🚚 Same-Day Delivery</h2>
<p><strong>Need it today?</strong> We offer same-day delivery for orders placed within our daily window and paid online.</p>

<h3>How it works</h3>
<ol>
  <li><strong>Order between 10AM and 9PM.</strong> Orders placed within this window can qualify for same-day delivery.</li>
  <li><strong>Pay online</strong> — GCash, Maya, or card. Same-day delivery is <strong>not available for Cash on Delivery (COD)</strong>.</li>
  <li><strong>Message us on Messenger</strong> to arrange it: <a href="https://m.me/MedievalMNL" target="_blank" rel="noopener">m.me/MedievalMNL</a>. Tell us your order number and address.</li>
</ol>

<h3>Delivery fee</h3>
<p>Same-day delivery uses a courier (e.g. Lalamove). The <strong>courier fee is paid by the customer</strong> and depends on your location, so there's no fixed price — we'll confirm the exact amount with you on Messenger.</p>

<h3>If you don't message us</h3>
<p>No problem — your paid order will still ship as our <strong>free nationwide delivery</strong> (2–5 business days via J&amp;T Express). You won't lose your order.</p>

<h3>Questions?</h3>
<p><a href="https://m.me/MedievalMNL" target="_blank" rel="noopener">Message us on Messenger</a> and we'll help you out.</p>
```

> Tip: keep the wording consistent with the storefront notices (Theme settings → Same-Day Delivery Notice) so customers see the same message everywhere.
