const { test, expect, request } = require("@playwright/test");
const {aPIUtils, APIUtils}=require('../utils/APIUtils')
const loginPayload = {
  userEmail: "anshika@gmail.com",
  userPassword: "Iamking@000",
};
let response;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  // const aPIUtils=new APIUtils(apiContext,loginPayload)
  // response=await aPIUtils.getToken()
  //console.log(token);
    const aPIUtils=new APIUtils(apiContext)
    response=await aPIUtils.getToken(loginPayload)
    console.log(response);
});
test("@Client App login", async ({ page }) => {
  page.addInitScript((value) => {
    window.sessionStorage.setItem("token", value);
  }, response.token);

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
