const { test, expect, request } = require("@playwright/test");
//const { request } = require('express');
const loginPayload = {
  userEmail: "anshika@gmail.com",
  userPassword: "Iamking@000",
};
let token;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const loginResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
    { data: loginPayload }
  );
  expect(loginResponse.ok()).toBeTruthy();
  const loginResponseJson = await loginResponse.json();
  token = loginResponseJson.token;
  //console.log(token);
  // added new feature
});
test("@Client App login", async ({ page }) => {
  page.addInitScript((value) => {
    window.sessionStorage.setItem("token", value);
  }, token);

  const email = "";
  const productName = "zara coat 3";
  const products = page.locator(".card-body");
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);
  const count = await products.count();
  for (let i = 0; i < count; ++i) {
    if (products.nth(i).locator("b").textContent() === productName) {
      await expect(products.nth(i).locator("b")).toHaveText(productName);
    }
  }
});
