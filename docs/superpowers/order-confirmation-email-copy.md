# Order Confirmation Email — Same-Day Delivery Notice (paste-ready)

This block is **not part of the theme**. The order confirmation email is a transactional
notification edited in the Shopify Admin. Follow the steps below to add the same-day delivery
notice to it.

## Where to paste it

1. In Shopify Admin, go to **Settings → Notifications**.
2. Under **Customer notifications**, open **Order confirmation**.
3. Click **Edit code** (top right).
4. In the **Email body (HTML)** box, paste the HTML block below. A good spot is **right after
   the greeting line** (e.g. just after the `{% if ... %}` "Thank you for your purchase" block)
   and **before** the order summary table.
5. Click **Save**.
6. Click **Send test** to email yourself a preview and confirm it looks right.

> Tip: if you also want it on the **Shipping confirmation** email later, repeat the same steps
> on that template. (Currently out of scope — order confirmation only.)

## HTML block (styled to match Shopify notification emails)

```html
<table style="width:100%;margin:16px 0;border:1px solid #e3e3e3;border-radius:6px;background:#f7f7f7;">
  <tr>
    <td style="padding:14px 16px;font-family:Helvetica,Arial,sans-serif;font-size:14px;color:#1a1a1a;line-height:1.5;">
      <strong>🚚 Get it today! Order between 10AM–9PM for same-day delivery.</strong><br>
      Place your order within those hours and pay online with GCash, Maya, or card to get it the same day.
      Same-day delivery is <strong>not available for Cash on Delivery</strong>.
      To arrange it,
      <a href="https://m.me/MedievalMNL" style="color:#1a73e8;">message us on Messenger</a>.
    </td>
  </tr>
</table>
```

## Plain-text fallback (if you maintain a text version)

```
Get it today! Order between 10AM–9PM and pay online with GCash, Maya, or card to get it the same day — not available for Cash on Delivery. Message us on Messenger to arrange: https://m.me/MedievalMNL
```

## Notes

- The Messenger link `https://m.me/MedievalMNL` opens a chat directly. If you'd rather link the
  Facebook Page, use `https://www.facebook.com/MedievalMNL` instead.
- Keep the wording consistent with the storefront notice (theme settings → **Same-Day Delivery
  Notice**) so customers see the same message everywhere.
