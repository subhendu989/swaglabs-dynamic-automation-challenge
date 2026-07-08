const { chromium } = require("playwright");
const { expect } = require("@playwright/test"); // ক্র্যাশ এড়াতে এই লাইনটি অবশ্যই লাগবে

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://www.saucedemo.com");
  
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // [Assertion 1]: Assert that the login is successful and the user is redirected to the products page
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  console.log("Assertion 1 Passed: logged in successfully and redirected to the products page.");
})();