const { test, expect, request } = require("@playwright/test");
//const { json } = require("body-parser");
//const { request } = require('express');
const loginPayload = {
  userEmail: "anshika@gmail.com",
  userPassword: "Iamking@000",
};
const orderPayload={
    
orders: [{country: "India",
 productOrderedId: "6581ca399fd99c85e8ee7f45"
}]};
let orderId;
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
  console.log(token);
  const orderResponse=await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/order/create-order",{
    data:orderPayload,
    headers:{
        "Authorization":token,
        "Content-Type":"application/json"
    }
  });
  const orderResponseJson=await orderResponse.json();
  console.log(orderResponseJson)
  orderId = orderResponseJson.orders[0]
});
test('@Client App login', async ({ page }) => {

   await page.addInitScript((value) => {
        window.sessionStorage.setItem("token", value);
      }, token);
    await page.goto("https://rahulshettyacademy.com/client");

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

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows =  page.locator("tbody tr");
    for (let i = 0; i < await rows.count(); ++i) {
       const rowOrderId = await rows.nth(i).locator("th").textContent();
       if (orderId.includes(rowOrderId)) {
          await rows.nth(i).locator("button").first().click();
          break;
       }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    await page.pause()
    expect(orderId.includes(orderIdDetails)).toBeTruthy(); 
 })