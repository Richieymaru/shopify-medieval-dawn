// @ts-check

// Hide "Cash on Delivery (COD)" when the customer selected "Same Day Delivery".
// Same-day must be paid online (GCash/Maya/card), so COD is removed at checkout.
//
// If you ever rename either option in your store, update these two values
// to match EXACTLY, then run `shopify app deploy` again.
const SAME_DAY_TITLE = "Same Day Delivery";
const COD_NAME = "Cash on Delivery (COD)";

const NO_CHANGES = { operations: [] };

/**
 * @param {any} input
 * @returns {any}
 */
export function cartPaymentMethodsTransformRun(input) {
  // Did the customer pick "Same Day Delivery" as their shipping option?
  const sameDaySelected = (input.cart?.deliveryGroups ?? []).some(
    (group) => group.selectedDeliveryOption?.title === SAME_DAY_TITLE
  );

  if (!sameDaySelected) {
    return NO_CHANGES;
  }

  // Hide the COD payment method (there should be exactly one match).
  const operations = (input.paymentMethods ?? [])
    .filter((method) => method.name === COD_NAME)
    .map((method) => ({
      paymentMethodHide: { paymentMethodId: method.id },
    }));

  return operations.length > 0 ? { operations } : NO_CHANGES;
}
