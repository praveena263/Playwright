const { test, expect, request } = require("@playwright/test");
//const { request } = require('express');
// const loginPayload = {
//   userEmail: "anshika@gmail.com",
//   userPassword: "Iamking@000",
// };


// let token;

// test.beforeAll(async () => {
//   const apiContext = await request.newContext();
//   const loginResponse = await apiContext.post(
//     "https://rahulshettyacademy.com/api/ecom/auth/login",
//     { data: loginPayload }
//   );
//   expect(loginResponse.ok()).toBeTruthy();
//   const loginResponseJson = await loginResponse.json();
//   token = loginResponseJson.token;
//   //console.log(token);
// });
let webContext;
test.beforeAll(async({browser})=>{
    const context=await browser.newContext();
    const page=await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/");
    const emailId=page.locator('#userEmail');
    const passWord=page.locator('#userPassword');
    const logIn=page.locator('[value="Login"]') 
    await emailId.fill("anshika@gmail.com")
    await passWord.fill("Iamking@000")
    await logIn.click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path:'state.json'})
    await browser.newContext();
    webContext=await browser.newContext({staroageState:'state.json'})
})
test("@Client App login", async () => {
  const page=await webContext.newPage();
  const email = "";
  const productName = "zara coat 3";
  const products = page.locator(".card-body");
  const titles = await page.locator(".card-body h5").allTextContents();
  console.log(titles);
  const count = await products.count();
  for (let i = 0; i < count; ++i) {
    if (products.nth(i).locator("b").textContent() === productName) {
      await expect(products.nth(i).locator("b")).toHaveText(productName);
    }
  }
});
//below test is not working but code is rite
test('Place order', async () => {
 const page=await webContext.newPage();
   const productName = "zara coat 3";
   const products =await page.locator(".card-body");
   const titles = await page.locator("h5").allTextContents();
   console.log(titles);
   const count = await products.count();
   for (let i = 0; i < count; ++i) {
     if (products.nth(i).locator("b").textContent() === productName) {
       await expect(products.nth(i).locator("b")).toHaveText(productName);
     }
   }
 
//     // await page.locator(".fa-handshake-o").click({timeout:5000});
//      await page.locator("tbody").waitFor();
//      const rows =  page.locator("tbody tr");
//      for (let i = 0; i < await rows.count(); ++i) {
//         const rowOrderId = await rows.nth(i).locator("th").textContent();
//         if (orderId.includes(rowOrderId)) {
//            await rows.nth(i).locator("button").first().click();
//            break;
//         }
//      }
//      const orderIdDetails = await page.locator(".col-text").textContent();
//      await page.pause()
//      expect(orderId.includes(orderIdDetails)).toBeTruthy(); 
  })
