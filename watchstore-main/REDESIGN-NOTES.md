# Redesign notes

Not run: `npm install` / `next build` were not possible in the authoring environment (no network).
Run `npm install && npm run build` and click through the checklist below before deploying.

## Owner decisions needed
- app/data/reviews.ts: the 4 homepage reviews came from the old code. Replace with real ones or empty the array.
- Product copy in app/data/products.ts still says "100% Original", "Water Resistant" and names a Rolex. Verify or remove.
- Products 3 and 4 use Unsplash stock photos (w=400, low-res) that are not your products.
- Hero uses crops of banner.jpeg (public/hero-desktop.jpg, hero-mobile.jpg). Drop in studio gift-box shots with the same names.
- Product reviews written on the site are stored only in the visitor's browser (localStorage).
- FAQ answers for delivery time and damaged orders are placeholders based on existing policy. Confirm.

## Test checklist
Add to cart / qty / remove (drawer, /cart, /checkout), Buy Now, COD + Easypaisa order reaching the Google Sheet,
search, filter/sort sheet on phone, wishlist, WhatsApp + tel links, 320px width, keyboard tabbing.
