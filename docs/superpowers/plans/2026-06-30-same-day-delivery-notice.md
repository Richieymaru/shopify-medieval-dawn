# Same-Day Delivery Notice Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add editable, informational "same-day delivery" notices to the announcement bar, product page, and cart drawer, plus paste-ready order-confirmation email copy.

**Architecture:** All content lives in one new theme-settings group. One reusable snippet (`same-day-delivery-notice.liquid`) renders the notice in a `short` or `full` variant and is included in three locations, each gated by its own toggle. Email copy is a separate deliverable doc (applied by the merchant in Shopify Admin, not theme code).

**Tech Stack:** Shopify Liquid, theme settings (`config/settings_schema.json`), no JS, no new asset files (scoped CSS lives inside the snippet).

## Global Constraints

- Merchant/brand: **Medieval MNL**. Messenger URL default: `https://m.me/MedievalMNL`.
- Hours: **10 AM – 9 PM**. Same-day = **PayMongo / prepaid only**, **NOT** Cash on Delivery.
- Same-day is arranged **via Messenger**, not a checkout option. Informational text only — no checkout gate, no Shopify Function.
- All notices must render **nothing** when `settings.sdd_enabled` is off, or when the relevant per-location toggle is off, or when the chosen message is blank.
- Additive only: wrap every integration in `{% if %}` guards; do not remove or restructure existing markup.
- No automated test framework exists (Shopify theme). Verification = manual checks in the theme editor / preview, described per task.
- Reuse existing snippets: `icon-info.liquid`, `icon-facebook.liquid`. External links: `target="_blank" rel="noopener"`.

---

### Task 1: Add the "Same-Day Delivery Notice" theme settings group

**Files:**
- Modify: `config/settings_schema.json` (append a new settings object before the closing `]`)

**Interfaces:**
- Produces these global settings, consumed by the snippet in Task 2:
  - `settings.sdd_enabled` (boolean)
  - `settings.sdd_message_short` (string)
  - `settings.sdd_message_full` (string/richtext html)
  - `settings.sdd_hours` (string)
  - `settings.sdd_messenger_url` (url string)
  - `settings.sdd_button_label` (string)
  - `settings.sdd_show_announcement` (boolean)
  - `settings.sdd_show_product` (boolean)
  - `settings.sdd_show_cart` (boolean)

- [ ] **Step 1: Append the settings group**

In `config/settings_schema.json`, add this object as the **last element** of the top-level array (insert a comma after the current final object, then this):

```json
  {
    "name": "Same-Day Delivery Notice",
    "settings": [
      {
        "type": "paragraph",
        "content": "Informational notice about same-day delivery (PayMongo/prepaid only, arranged via Messenger). Shows on the announcement bar, product page, and cart drawer."
      },
      {
        "type": "checkbox",
        "id": "sdd_enabled",
        "label": "Enable same-day delivery notice",
        "default": true
      },
      {
        "type": "text",
        "id": "sdd_message_short",
        "label": "Short message (announcement bar & cart)",
        "default": "Need it today? Same-day delivery available 10AM–9PM on prepaid (PayMongo) orders."
      },
      {
        "type": "richtext",
        "id": "sdd_message_full",
        "label": "Full message (product page)",
        "default": "<p>We offer <strong>same-day delivery (10AM–9PM)</strong> for orders paid online via PayMongo (card, GCash, Maya). Not available for Cash on Delivery. Message us on Messenger to arrange it.</p>"
      },
      {
        "type": "text",
        "id": "sdd_hours",
        "label": "Delivery hours label",
        "default": "10AM–9PM"
      },
      {
        "type": "url",
        "id": "sdd_messenger_url",
        "label": "Messenger link",
        "info": "Use the m.me link to open a chat directly, e.g. https://m.me/MedievalMNL"
      },
      {
        "type": "text",
        "id": "sdd_button_label",
        "label": "Button label",
        "default": "Message us on Messenger"
      },
      {
        "type": "header",
        "content": "Show in these locations"
      },
      {
        "type": "checkbox",
        "id": "sdd_show_announcement",
        "label": "Announcement bar",
        "default": true
      },
      {
        "type": "checkbox",
        "id": "sdd_show_product",
        "label": "Product page (under buy buttons)",
        "default": true
      },
      {
        "type": "checkbox",
        "id": "sdd_show_cart",
        "label": "Cart drawer",
        "default": true
      }
    ]
  }
```

Note: `url` setting types do not accept a `default` in Shopify schema, so `sdd_messenger_url` has no default — set it in the customizer after install (value: `https://m.me/MedievalMNL`).

- [ ] **Step 2: Validate JSON**

Run: `node -e "JSON.parse(require('fs').readFileSync('config/settings_schema.json','utf8')); console.log('valid')"`
Expected: prints `valid` (no JSON syntax error).

- [ ] **Step 3: Commit**

```bash
git add config/settings_schema.json
git commit -m "feat: add Same-Day Delivery Notice theme settings group"
```

---

### Task 2: Create the reusable notice snippet

**Files:**
- Create: `snippets/same-day-delivery-notice.liquid`

**Interfaces:**
- Consumes: all `settings.sdd_*` from Task 1; existing snippets `icon-info`, `icon-facebook`.
- Produces: snippet callable as `{% render 'same-day-delivery-notice', variant: 'short' %}` or `variant: 'full'`. Renders nothing when disabled/blank. Self-contained scoped CSS (class prefix `sdd-notice`).

- [ ] **Step 1: Write the snippet**

Create `snippets/same-day-delivery-notice.liquid` with exactly:

```liquid
{% comment %}
  Renders the same-day delivery informational notice.
  Accepts:
  - variant: {String} 'short' (announcement bar, cart) or 'full' (product page). Default 'short'.

  Reads all content from theme settings (settings.sdd_*).
  Renders nothing when the feature is disabled or the chosen message is blank.

  Usage:
  {% render 'same-day-delivery-notice', variant: 'full' %}
{% endcomment %}

{%- liquid
  assign sdd_variant = variant | default: 'short'
  if sdd_variant == 'full'
    assign sdd_message = settings.sdd_message_full
  else
    assign sdd_message = settings.sdd_message_short
  endif
-%}

{%- if settings.sdd_enabled and sdd_message != blank -%}
  {%- style -%}
    .sdd-notice {
      display: flex;
      align-items: flex-start;
      gap: 0.6rem;
      flex-wrap: wrap;
      padding: 0.8rem 1rem;
      margin: 1rem 0;
      border: 1px solid rgba(var(--color-foreground), 0.15);
      border-radius: var(--inputs-radius, 0.4rem);
      background: rgba(var(--color-foreground), 0.04);
      font-size: 1.4rem;
      line-height: 1.4;
    }
    .sdd-notice--short { margin: 0.6rem 0; padding: 0.6rem 0.9rem; font-size: 1.3rem; }
    .sdd-notice__icon { flex: 0 0 auto; width: 1.8rem; height: 1.8rem; margin-top: 0.1rem; }
    .sdd-notice__icon .icon { width: 100%; height: 100%; }
    .sdd-notice__body { flex: 1 1 12rem; }
    .sdd-notice__body > * { margin: 0; }
    .sdd-notice__cta {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      margin-top: 0.5rem;
      font-weight: 600;
      text-decoration: underline;
    }
    .sdd-notice__cta .icon { width: 1.5rem; height: 1.5rem; }
  {%- endstyle -%}

  <div class="sdd-notice sdd-notice--{{ sdd_variant }}">
    <span class="sdd-notice__icon" aria-hidden="true">{% render 'icon-info' %}</span>
    <div class="sdd-notice__body">
      {%- if sdd_variant == 'full' -%}
        {{ sdd_message }}
      {%- else -%}
        <p>{{ sdd_message | escape }}</p>
      {%- endif -%}
      {%- if settings.sdd_messenger_url != blank -%}
        <a
          class="sdd-notice__cta"
          href="{{ settings.sdd_messenger_url }}"
          target="_blank"
          rel="noopener"
        >
          {% render 'icon-facebook' %}
          {{ settings.sdd_button_label | default: 'Message us on Messenger' | escape }}
        </a>
      {%- endif -%}
    </div>
  </div>
{%- endif -%}
```

- [ ] **Step 2: Lint the Liquid (best-effort)**

Run: `shopify theme check --category liquid 2>&1 | head -40` (if Shopify CLI is installed). 
Expected: no new **errors** referencing `same-day-delivery-notice.liquid`. If CLI is unavailable, skip and rely on the preview check in later tasks.

- [ ] **Step 3: Commit**

```bash
git add snippets/same-day-delivery-notice.liquid
git commit -m "feat: add reusable same-day delivery notice snippet"
```

---

### Task 3: Render the notice on the product page

**Files:**
- Modify: `sections/main-product.liquid` (after the `buy_buttons` block render, around lines 948-955)

**Interfaces:**
- Consumes: `same-day-delivery-notice` snippet (Task 2), `settings.sdd_show_product` (Task 1).

- [ ] **Step 1: Insert the render call**

In `sections/main-product.liquid`, find the `{%- when 'buy_buttons' -%}` case. Immediately **after** the closing `-%}` of the `{%- render 'buy-buttons', ... -%}` call (currently line 955) and **before** the `<div class="available-gateway">` line, insert:

```liquid
                {%- if settings.sdd_show_product -%}
                  {%- render 'same-day-delivery-notice', variant: 'full' -%}
                {%- endif -%}
```

- [ ] **Step 2: Verify in preview**

Run: `shopify theme dev` (or push to a dev/preview theme) and open any product page.
Expected: Below the Add-to-cart/buy buttons, the **full** notice appears with the info icon, the bold "same-day delivery (10AM–9PM)" text, and the Messenger button. Set the Messenger URL in customizer first so the button shows.

- [ ] **Step 3: Verify the product toggle**

In the customizer, uncheck **Theme settings → Same-Day Delivery Notice → Product page**.
Expected: notice disappears from the product page; announcement bar and cart unaffected.

- [ ] **Step 4: Commit**

```bash
git add sections/main-product.liquid
git commit -m "feat: show same-day delivery notice on product page"
```

---

### Task 4: Render the notice in the cart drawer

**Files:**
- Modify: `snippets/cart-drawer.liquid` (before `<div class="cart__ctas">`, around line 699)

**Interfaces:**
- Consumes: `same-day-delivery-notice` snippet (Task 2), `settings.sdd_show_cart` (Task 1).

- [ ] **Step 1: Insert the render call**

In `snippets/cart-drawer.liquid`, find the `<!-- CTAs -->` comment / `<div class="cart__ctas"` line (≈697-699). Immediately **before** the `<div class="cart__ctas"...>` opening tag, insert:

```liquid
        {%- if settings.sdd_show_cart -%}
          {%- render 'same-day-delivery-notice', variant: 'short' -%}
        {%- endif -%}
```

- [ ] **Step 2: Verify in preview**

Open the cart drawer (add an item, click the cart icon).
Expected: Above the CHECKOUT button, the **short** notice appears with info icon + Messenger button.

- [ ] **Step 3: Verify the cart toggle**

Uncheck **Same-Day Delivery Notice → Cart drawer** in the customizer.
Expected: notice disappears from the cart drawer only.

- [ ] **Step 4: Commit**

```bash
git add snippets/cart-drawer.liquid
git commit -m "feat: show same-day delivery notice in cart drawer"
```

---

### Task 5: Render the notice in the announcement bar

**Files:**
- Modify: `sections/announcement-bar.liquid` (inside the utility bar grid, after the opening `<div class="page-width utility-bar__grid...">`, around line 38)

**Interfaces:**
- Consumes: `same-day-delivery-notice` snippet (Task 2), `settings.sdd_show_announcement` (Task 1).

- [ ] **Step 1: Insert the render call**

In `sections/announcement-bar.liquid`, immediately **after** the opening tag `<div class="page-width utility-bar__grid...">` (line ≈38) and **before** the `{%- if section.settings.show_social and social_icons -%}` line, insert:

```liquid
    {%- if settings.sdd_show_announcement -%}
      <div class="utility-bar__sdd">
        {%- render 'same-day-delivery-notice', variant: 'short' -%}
      </div>
    {%- endif -%}
```

- [ ] **Step 2: Verify in preview**

Load any storefront page.
Expected: The **short** same-day notice renders in the top utility bar without breaking the existing announcement messages, social icons, or country/language selector layout (test with the announcement bar both empty and containing blocks).

- [ ] **Step 3: Verify the announcement toggle and master toggle**

- Uncheck **Same-Day Delivery Notice → Announcement bar** → notice disappears from the top bar only.
- Uncheck **Enable same-day delivery notice** (master) → notice disappears from all three locations (announcement, product, cart).

- [ ] **Step 4: Commit**

```bash
git add sections/announcement-bar.liquid
git commit -m "feat: show same-day delivery notice in announcement bar"
```

---

### Task 6: Deliver order-confirmation email copy

**Files:**
- Create: `docs/superpowers/order-confirmation-email-copy.md`

**Interfaces:**
- Standalone deliverable. No theme code. Merchant pastes into Admin → Settings → Notifications → Order confirmation.

- [ ] **Step 1: Write the email copy doc**

Create `docs/superpowers/order-confirmation-email-copy.md` containing:
1. Step-by-step: Admin → Settings → Notifications → **Order confirmation** → Edit code → paste the HTML block just below the `{% if order... %}` greeting / above the order summary table → Save → send a test.
2. A styled HTML block matching Shopify notification width/colors:

```html
<table style="width:100%;margin:16px 0;border:1px solid #e3e3e3;border-radius:6px;background:#f7f7f7;">
  <tr>
    <td style="padding:14px 16px;font-family:Helvetica,Arial,sans-serif;font-size:14px;color:#1a1a1a;line-height:1.5;">
      <strong>🚚 Need it today? Same-day delivery available (10AM–9PM).</strong><br>
      Same-day delivery is available for orders paid online via PayMongo (card, GCash, Maya).
      It is <strong>not available for Cash on Delivery</strong>.
      To arrange same-day delivery,
      <a href="https://m.me/MedievalMNL" style="color:#1a73e8;">message us on Messenger</a>.
    </td>
  </tr>
</table>
```

3. A plain-text fallback line:

```
Need it today? Same-day delivery (10AM–9PM) is available for orders paid via PayMongo (card, GCash, Maya) — not for Cash on Delivery. Message us on Messenger to arrange: https://m.me/MedievalMNL
```

- [ ] **Step 2: Commit**

```bash
git add docs/superpowers/order-confirmation-email-copy.md
git commit -m "docs: add order confirmation email copy for same-day delivery"
```

---

## Self-Review

**Spec coverage:**
- Central theme settings → Task 1 ✓
- Reusable snippet (short/full) → Task 2 ✓
- Announcement bar → Task 5 ✓
- Product page → Task 3 ✓
- Cart drawer → Task 4 ✓
- Order confirmation email copy → Task 6 ✓
- No footer / no shipping email / no checkout enforcement → not implemented (correctly out of scope) ✓
- Per-location + master toggles, blank-URL handling, blank-message handling → Tasks 1, 2, verified in 3/4/5 ✓

**Placeholder scan:** No TBD/TODO; all code blocks complete; manual verification steps have concrete expected results. ✓

**Type consistency:** Setting ids (`sdd_*`) defined in Task 1 are referenced identically in Tasks 2–5. Snippet name `same-day-delivery-notice` and `variant` param consistent across Tasks 2–5. ✓

**Known adaptation:** Shopify's `url` setting type rejects `default`; documented in Task 1 (merchant sets `m.me/MedievalMNL` in customizer). ✓
