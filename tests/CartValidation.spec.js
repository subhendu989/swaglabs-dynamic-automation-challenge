const { chromium } = require("playwright");
const { expect } = require("@playwright/test");

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  
  await page.goto("https://www.saucedemo.com");
  
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

 
  const targetPrice = "$15.99";
  const productItems = page.locator(".inventory_item"); 
  const count = await productItems.count();

  for (let i = 0; i < count; i++) {
    const item = productItems.nth(i); 
    const priceText = await item.locator(".inventory_item_price").innerText();

    
    if (priceText === targetPrice) {
      
      // click Add to cart 
      const addToCartButton = item.locator("button:has-text('Add to cart')");
      await addToCartButton.click();

      // [Assertion 2]: check that the 'Remove' button is now visible for that product
      const removeButton = item.locator("button:has-text('Remove')");
      await expect(removeButton).toBeVisible();
      
      console.log(`Assertion 2 Passed: ${targetPrice} `);
      break;  
    }
  } 
  //  Cart Validation
  
  // Click the cart icon to navigate to the cart page
  const cartIcon = page.locator(".shopping_cart_link");
  await cartIcon.click();

  // Verify that the user is navigated to the cart page
  await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");

  const cartItems = page.locator(".cart_item");

  // [Assertion 3.1]: Assert that the cart page shows exactly 1 item
  await expect(cartItems).toHaveCount(1);
  console.log("Assertion 3.1 Passed: Cart contains exactly 1 item!");

  // [Assertion 3.2]: Assert that its price is indeed $15.99
  await expect(cartItems.locator(".inventory_item_price")).toHaveText("$15.99");
  console.log("Assertion 3.2 Passed: The price of the item in the cart is indeed $15.99!");

})();