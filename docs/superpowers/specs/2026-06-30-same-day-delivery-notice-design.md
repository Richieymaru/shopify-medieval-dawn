# Same-Day Delivery Notice — Design

**Date:** 2026-06-30
**Theme:** shopify-medieval-dawn (customized Dawn-based theme)

## Goal

Let customers know Medieval MNL offers **same-day delivery (10 AM – 9 PM)** for orders paid
online via **PayMongo** (credit card, GCash, Maya). Same-day delivery is **not available for
Cash on Delivery (COD)**. To avail it, the customer must **contact Medieval MNL on Messenger**
to arrange it.

Same-day delivery is **not a checkout shipping option** — it is arranged manually over
Messenger. Therefore this feature is **informational text only**. There is no checkout gate,
no Shopify Function, and no automated enforcement. The COD-vs-PayMongo rule is enforced by
staff during the Messenger conversation, not by code.

## Scope

In scope (theme code):
- Announcement bar notice
- Product page notice (under buy buttons)
- Cart drawer notice (above checkout button)
- Central theme settings to manage all content + per-location on/off toggles
- One reusable snippet powering all three locations

In scope (delivered as copy, applied by merchant in Shopify Admin — NOT theme code):
- Order confirmation email text (paste-ready HTML + plain text)

Out of scope (explicitly decided against):
- Footer placement
- Shipping confirmation email
- Checkout enforcement / Shopify Functions / delivery customization
- Shopify's native Local Delivery feature (intentionally not used)

## Architecture

### 1. Central content — theme settings

Add a new settings group **"Same-Day Delivery Notice"** to `config/settings_schema.json`.
All content lives here and is edited once in the theme customizer (Online Store → Customize →
Theme settings):

| Setting (id) | Type | Purpose | Default |
|---|---|---|---|
| `sdd_enabled` | checkbox | Master on/off for the whole feature | `true` |
| `sdd_message_short` | text | Short message for tight spots (announcement, cart) | "Need it today? Same-day delivery available 10 AM–9 PM on prepaid (PayMongo) orders." |
| `sdd_message_full` | richtext/text | Full message for product page | "We offer **same-day delivery (10 AM – 9 PM)** for orders paid online via PayMongo (card, GCash, Maya). Not available for Cash on Delivery. Message us on Messenger to arrange." |
| `sdd_hours` | text | Hours/cutoff label, reusable in messages | "10 AM – 9 PM" |
| `sdd_messenger_url` | url | Messenger link | `https://m.me/MedievalMNL` |
| `sdd_button_label` | text | CTA label | "Message us on Messenger" |
| `sdd_show_announcement` | checkbox | Show in announcement bar | `true` |
| `sdd_show_product` | checkbox | Show on product page | `true` |
| `sdd_show_cart` | checkbox | Show in cart drawer | `true` |

Notes:
- `sdd_hours` is provided as a separate field so the merchant can update hours in one place;
  message defaults reference the hours inline for simplicity (merchant keeps them in sync, or
  edits the full message directly). YAGNI: no token-substitution engine.
- `sdd_messenger_url` default is the `m.me` form so the button opens a Messenger chat directly
  (the Facebook Page URL `facebook.com/MedievalMNL` only opens the page, not a chat).

### 2. Reusable snippet — `snippets/same-day-delivery-notice.liquid`

Single source of rendering truth. Signature:

```liquid
{% render 'same-day-delivery-notice', variant: 'short' %}   {# or 'full' #}
```

Accepts:
- `variant`: `'short'` | `'full'` — picks `sdd_message_short` vs `sdd_message_full`.

Behavior:
- Renders nothing if `settings.sdd_enabled` is false.
- Renders nothing if the message for the chosen variant is blank.
- Outputs: an info icon (reuse existing `icon-info.liquid`), the message text, and — when
  `sdd_messenger_url` is present — a Messenger CTA link/button (`target="_blank"`,
  `rel="noopener"`) using `sdd_button_label`.
- The Facebook icon (`icon-facebook.liquid`) may be used on the CTA for recognizability.
- Scoped CSS lives in a `{% style %}` block inside the snippet (class prefix `sdd-notice`),
  so no new asset file is required and it stays self-contained.

### 3. Placement integration

Each location renders the shared snippet, gated by its own toggle:

| Location | File | Gate | Variant | Position |
|---|---|---|---|---|
| Announcement bar | `sections/announcement-bar.liquid` | `settings.sdd_show_announcement` | short | Rendered within the utility bar, before/alongside existing announcement blocks |
| Product page | `sections/main-product.liquid` (near the buy-buttons render) | `settings.sdd_show_product` | full | Directly below the Add-to-cart / buy buttons |
| Cart drawer | `snippets/cart-drawer.liquid` | `settings.sdd_show_cart` | short | Above the checkout button |

Integration is additive — wrapped in `{% if %}` guards so that turning the feature off (or a
specific location off) leaves the original markup untouched. No existing markup is removed.

### 4. Order confirmation email (merchant-applied, not in repo)

Deliverable is a short doc/snippet of copy the merchant pastes into
**Admin → Settings → Notifications → Order confirmation**, in two forms:
- HTML block (styled to match Shopify's default notification template width/colors)
- Plain-text fallback line

Content mirrors the full message: same-day delivery 10 AM–9 PM, PayMongo/prepaid only, not for
COD, with a Messenger link (`https://m.me/MedievalMNL`).

## Data Flow

```
Theme settings (settings_schema.json)
        │  (merchant edits text / link / toggles in customizer)
        ▼
snippets/same-day-delivery-notice.liquid   ← single render source
        │
        ├─ announcement-bar.liquid   (short, if sdd_show_announcement)
        ├─ main-product.liquid       (full,  if sdd_show_product)
        └─ cart-drawer.liquid        (short, if sdd_show_cart)

Order confirmation email  →  manual copy/paste in Shopify Admin (separate from theme)
```

## Error / Edge Handling

- Feature master-off (`sdd_enabled = false`): snippet renders nothing everywhere.
- Blank message for a variant: that render is skipped (no empty box).
- Blank `sdd_messenger_url`: message still shows, CTA button is omitted.
- Long messages in the announcement bar: CSS allows wrap/truncate gracefully; announcement bar
  layout (1-block vs multi-block grid) is not broken because the notice is rendered as an
  additional, self-contained element.
- Links open in a new tab with `rel="noopener"`.

## Testing / Verification

Manual verification in the theme editor / preview (no automated test framework in a Shopify
theme repo):
1. With defaults: notice appears in announcement bar (short), product page (full), cart drawer
   (short); Messenger button opens `m.me/MedievalMNL` in a new tab.
2. Toggle each `sdd_show_*` off → that location hides, others remain.
3. Toggle `sdd_enabled` off → all three hide.
4. Blank the Messenger URL → text shows, button hidden.
5. Edit short/full message text → updates reflect in the matching spots.
6. Confirm no regression to existing announcement bar, product buy-buttons, or cart drawer
   layout when the feature is on and off.

## Files Touched

- `config/settings_schema.json` — new "Same-Day Delivery Notice" settings group (modify)
- `snippets/same-day-delivery-notice.liquid` — new reusable snippet (create)
- `sections/announcement-bar.liquid` — render snippet, gated (modify)
- `sections/main-product.liquid` — render snippet near buy-buttons, gated (modify)
- `snippets/cart-drawer.liquid` — render snippet above checkout, gated (modify)
- `docs/.../order-confirmation-email-copy.md` — paste-ready email copy deliverable (create, at plan stage)
