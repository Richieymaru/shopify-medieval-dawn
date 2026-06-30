# Hide COD on Same Day Delivery — Deploy Guide

## What this builds
A Shopify **Payment Customization Function**. At checkout, when the customer selects the
**"Same Day Delivery"** shipping option, it **hides "Cash on Delivery (COD)"** so they must
pay online (GCash/Maya/card). For any other shipping option, nothing changes.

- Works on your current plan (not Plus-only) — hiding COD is a non-credit-card customization.
- No monthly fee — it's your own custom app.

## Prerequisites (already met)
- Node.js v24 ✅ and Shopify CLI 4.3.0 ✅
- A free Shopify Partner account / store-owner login (you'll log in via browser when prompted).

## The exact names this Function matches (must match your store exactly)
- Shipping option: **`Same Day Delivery`**
- Payment method: **`Cash on Delivery (COD)`**

If you rename either later, edit the two constants at the top of `run.js` and re-deploy.

---

## Steps

### 1. Create the app (this command makes the new app folder + logs you in)
```
cd "c:/Users/stain/OneDrive/Dokumen/GitHub"
shopify app init --name medieval-dawn-checkout-app --template none
```
- A browser opens → log in to Shopify → pick (or create, free) your Partner org.
- Choose **JavaScript** if asked for a language.

### 2. Generate the payment customization function
```
cd medieval-dawn-checkout-app
shopify app generate extension --template payment_customization --flavor vanilla-js --name hide-cod-same-day
```
This creates `extensions/hide-cod-same-day/` with a `src/run.graphql` and `src/run.js`.

### 3. Replace the two generated files with the prepared ones
Open these two prepared files (in this folder) and copy their contents over the generated ones:
- `run.graphql` → `extensions/hide-cod-same-day/src/run.graphql`
- `run.js` → `extensions/hide-cod-same-day/src/run.js`

> ⚠️ Keep the **export name** that the generator put in the file. If the generated
> `run.js` exports something other than `cartPaymentMethodsTransformRun`, keep that name and
> paste only the body/logic. (Most current CLI versions use `cartPaymentMethodsTransformRun`.)

### 4. Test locally
```
shopify app dev
```
Open the preview link it prints, try a checkout. Press **Ctrl+C** to stop.

### 5. Deploy (release a version)
```
shopify app deploy
```

### 6. Activate it on your store
After deploy, the function exists but must be turned on:
- Install the app on your store if prompted (**Admin → Apps**).
- Activate the payment customization. The exact spot depends on your admin —
  it's either under **Settings → Payments → Customizations**, or via a quick
  Admin API call. **Ping me when you reach this step and I'll give you the exact method.**

### 7. Test at checkout (do this both ways)
1. Add a product (≥ ₱500) → checkout.
2. Pick **Same Day Delivery** → at payment, **Cash on Delivery (COD) should be gone**, only PayMongo shows. ✅
3. Go back, pick **Free Shipping** → **COD reappears**. ✅
4. Place one real test order each way to be sure.

---

## Notes
- This app is **separate from your theme** — the theme, the same-day cards, and the email are untouched.
- The input query was validated against Shopify's live Payment Customization schema.
- Performance: trivial (a couple checks per checkout).
