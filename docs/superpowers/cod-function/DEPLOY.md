# Hide COD on Same Day Delivery — Status & Remaining Steps

## ✅ Already done (built + tested)
The custom app and Function are created and working locally:
- **App folder:** `GitHub/medieval-dawn-checkout-app/` (separate from the theme)
- **Function extension:** `extensions/cod-rule/` (Payment Customization)
- **Logic:** when shipping = **"Same Day Delivery"**, hide **"Cash on Delivery (COD)"**; otherwise no change.
- Input query **validated** against Shopify's live schema.
- Function **builds** to wasm (javy) successfully.
- **Local tests pass:**
  - Same Day Delivery selected → COD is hidden ✅
  - Free Shipping selected → nothing changes (COD stays) ✅

The exact names it matches (must match the store exactly):
- Shipping option: `Same Day Delivery`
- Payment method: `Cash on Delivery (COD)`

If you rename either later: edit the two constants at the top of
`extensions/cod-rule/src/cart_payment_methods_transform_run.js` and re-deploy.

## ⚠️ Tooling note (already fixed)
The CLI initially failed type-generation because the app had both npm and pnpm
config; the pnpm files (`pnpm-workspace.yaml`, `pnpm-lock.yaml`) were removed so the
CLI uses npm. If you re-scaffold anything and it fails on "Building GraphQL types,"
delete those two pnpm files and retry.

---

## Remaining steps (need your Shopify login)

### 1. Deploy the app (YOU run this)
From the app folder:
```
cd "c:/Users/stain/OneDrive/Dokumen/GitHub/medieval-dawn-checkout-app"
shopify app deploy
```
- Log in / confirm the org if prompted.
- This registers the Function with Shopify and creates an app version.
- When it finishes, it will have **installed/linked the app** to your dev store.

### 2. Activate the payment customization
After deploy, the Function exists but must be switched on by creating a
"payment customization" that points to it. This is the one step whose exact path
varies by store. **Tell me once deploy succeeds** and I'll give you the precise method
for your admin (either the Settings → Payments customization screen, or a one-time
Admin API `paymentCustomizationCreate` call — I'll generate it for you).

### 3. Test at real checkout (both ways)
1. Add a product (≥ ₱500) → checkout.
2. Pick **Same Day Delivery** → at payment, **Cash on Delivery (COD) disappears**, only PayMongo shows. ✅
3. Go back, pick **Free Shipping** → **COD reappears**. ✅
4. Place one test order each way.

---

## Reference: the code (already in place in the app)
- Query: `extensions/cod-rule/src/cart_payment_methods_transform_run.graphql`
- Logic: `extensions/cod-rule/src/cart_payment_methods_transform_run.js`
- A copy of the validated query/logic also lives here in `run.graphql` / `run.js`.
