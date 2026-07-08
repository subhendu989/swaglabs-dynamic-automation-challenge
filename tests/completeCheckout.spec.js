const { chromium } = require("playwright");
const { expect } = require("@playwright/test");

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // --- Step 1: Login ---
  await page.goto("https://www.saucedemo.com");
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // [Assertion 1]: Verify login success
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  console.log("Assertion 1 Passed!");

  // --- Step 2: Dynamic Add to Cart ---
  const targetPrice = "$15.99";
  const productItems = page.locator(".inventory_item"); 
  const count = await productItems.count();

  for (let i = 0; i < count; i++) {
    const item = productItems.nth(i); 
    const priceText = await item.locator(".inventory_item_price").innerText();

    if (priceText === targetPrice) {
      await item.locator("button:has-text('Add to cart')").click();

      // [Assertion 2]: Verify button text changes to Remove
      const removeButton = item.locator("button:has-text('Remove')");
      await expect(removeButton).toBeVisible();
      
      console.log("Assertion 2 Passed!");
      break; 
    }
  }

  // --- Step 3: Cart Validation ---
  await page.locator(".shopping_cart_link").click();

  // Verify navigation to cart page
  await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");

  const cartItems = page.locator(".cart_item");

  // [Assertion 3]: Verify cart has exactly 1 item priced at $15.99
  await expect(cartItems).toHaveCount(1);
  await expect(cartItems.locator(".inventory_item_price")).toHaveText(targetPrice);
  console.log("Assertion 3 Passed!");

  // --- Step 4: Complete Purchase ---
  await page.click('#checkout');

  // Fill shipping form with random strings
  await page.fill('#first-name', 'John_' + Math.random().toString(36).substring(7));
  await page.fill('#last-name', 'Doe_' + Math.random().toString(36).substring(7));
  await page.fill('#postal-code', Math.floor(10000 + Math.random() * 90000).toString());

  await page.click('#continue');
  await page.click('#finish');

  // [Assertion 4]: Verify success message is visible
  const successMessage = page.locator('.complete-header');
  await expect(successMessage).toHaveText('Thank you for your order!');
  console.log("Assertion 4 Passed!");

  // await browser.close();
})();