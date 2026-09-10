// Site-wide purchasing switch.
//
// While this is false, every product's Add to Cart button is disabled and
// reads "Coming Soon" — regardless of what each page's own inventory data
// says. This exists because the Square inventory library isn't fully built
// out yet, and we'd rather block all purchasing for a moment than risk
// someone ordering something that isn't actually ready to ship.
//
// Once the Square item library is finalized: flip this to true. Nothing
// else needs to change — the real per-product, per-size inventory logic
// (slashed swatches, sold-out sizes, etc.) is already in place and takes
// back over automatically.

window.STORE_ACCEPTING_ORDERS = false;
