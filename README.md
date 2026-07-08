# SauceDemo (Swag Labs) Automated E2E Flow

This repository contains an Automated End-to-End (E2E) test suite for the [SauceDemo](https://www.saucedemo.com/) web application. It was developed as part of a technical Software Quality Assurance (SQA) assessment task to demonstrate professional web automation and quality engineering capabilities.

## 🚀 Key Features & Automation Rules
- **Page Object Model (POM):** Structured cleanly by separating locators and test actions from the main execution logic.
- **Dynamic Element Scanning:** Scans product listings dynamically to interact with items based on specific criteria (e.g., price matching) without hardcoding indexes or product names.
- **Strict Web-First Assertions:** Zero usage of prohibited static delays or `page.waitForTimeout()`. Fully utilizes Playwright's native auto-waiting assertions.
- **Dynamic Data Generation:** Implements dynamic random string generation for checkout shipping forms to ensure unique test data per execution.

---

## 📋 Automated Flow Requirements

The script automates the complete purchase lifecycle through the following consecutive steps:

1. **Successful Login:** Logs into the system and asserts redirection to the inventory/products page.
2. **Dynamic Add to Cart:** Scans all items dynamically to find and click "Add to cart" for the product costing exactly **$15.99**, validating that the specific button text changes to "Remove".
3. **Cart Validation:** Navigates to the cart page to assert it contains exactly **1 item** and verifies its price matches **$15.99**.
4. **Checkout & Purchase:** Fills the shipping form with random alphanumeric strings, finishes the order, and asserts the visibility of the success message: `"Thank you for your order!"`.

---

## 🛠️ Tech Stack & Prerequisites

- **Language:** JavaScript (Node.js)
- **Automation Tool:** Playwright

Make sure you have [Node.js](https://nodejs.org/) installed before running the project.

---

## ⚙️ Setup and Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/YOUR_USERNAME/saucedemo-playwright-pom-automation.git](https://github.com/YOUR_USERNAME/saucedemo-playwright-pom-automation.git)
   cd saucedemo-playwright-pom-automation
