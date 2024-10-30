const { test, expect, request } = require("@playwright/test");
const {APIUtils}=require('../utils/APIUtils');
//import {APIUtils} from "../utils/APIUtils"

const loginPayload = {
  userEmail: "anshika@gmail.com",
  userPassword: "Iamking@000",
};
const orderPayload={
    
orders: [{country: "India",
 productOrderedId: "6581ca399fd99c85e8ee7f45"
}]};
let response;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const aPIUtils=new APIUtils(apiContext);
  response = await aPIUtils.getToken(loginPayload)
  console.log("1111  :"+response)
  response = await aPIUtils.createOrder(orderPayload)
  console.log("22222  :"+response)
  //aPIUtils.getToken()
  // const loginResponse = await apiContext.post(
  //   "https://rahulshettyacademy.com/api/ecom/auth/login",
  //   { data: loginPayload }
  // );
  //expect(loginResponse.ok()).toBeTruthy();
  // const loginResponseJson = await loginResponse.json();
  // token = loginResponseJson.token;
  // console.log(token);

});
test('Place order', async ({ page }) => {
 
  await page.addInitScript((value) => {
    window.sessionStorage.setItem("token", value);
  }, response.token);
await page.goto("https://rahulshettyacademy.com/client");

await page.locator("button[routerlink*='myorders']").click();
await page.locator("tbody").waitFor();
const rows =  page.locator("tbody tr");
for (let i = 0; i < await rows.count(); ++i) {
   const rowOrderId = await rows.nth(i).locator("th").textContent();
   if (response.orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
   }
}
const orderIdDetails = await page.locator(".col-text").textContent();
await page.pause()
await expect(response.orderId.includes(orderIdDetails)).toBeTruthy();    
 })