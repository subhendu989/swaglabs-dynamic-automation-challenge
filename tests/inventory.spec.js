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

})();