const { test, expect } = require("@playwright/test");
test("Browser First test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const userName = page.locator("#username");
  const passWord = page.locator("#password");
  const signIn = page.locator("#signInBtn");
  const cardTitle = page.locator('.card-body a');
  await userName.type("rahulshettyacademy11");
  await passWord.type("learning");
  await signIn.click();
  console.log(await page.locator("[style*='block']").textContent());  
  await expect(page.locator("[style*='block']")).toContainText(
    "Incorrect username/password."
  );
//   await userName.fill("");
  await userName.fill("rahulshettyacademy");
//   await passWord.fill("");
  await passWord.fill("learning");
  await signIn.click()
  await expect( page.locator("h1")).toContainText("Shop Name");
//   console.log(await cardTitle.first().textContent());
//   console.log(await cardTitle.nth(0).textContent());
//   console.log(await cardTitle.last().textContent());
//   console.log(await cardTitle.allTextContents());
const allTitles = await cardTitle.allTextContents();
console.log(allTitles);
});
test("Page First test", async ({ page }) => {
  await page.goto("https://google.com/");
  //get tittle- assertion
  console.log(await page.title());
  expect(await page).toHaveTitle("Google");
});
test("Assignment",async ({browser})=>{
    const content=await browser.newContext();
    const page=await content.newPage();
    await page.goto("https://rahulshettyacademy.com/client/");
    const register= page.locator(".text-reset");
    await register.click();
    await page.locator("#firstName").type("Praveena");
    await page.locator("#lastName").type("Kunche");
    await page.locator("#userEmail").type("veenaamar25@gmail.com");
    await page.locator("#userMobile").type("8482181541");
    await page.locator('[formcontrolname="occupation"]').selectOption("Student");
    await page.getByLabel('Female').click();
    //await page.getByPlaceholder('Passsword').type('123')
    await page.locator("#userPassword").type("123");
    await page.locator("#confirmPassword").type("123");
    //await page.locator('[class="ng-untouched ng-pristine ng-invalid"]').click()
    await page.locator(".col-md-1").click();
    await page.locator("#login").click();
     expect(await page.locator('[style*="#dc3545;]')).toContainText("*Please check above checkbox)");
    await page.locator('[formcontrolname="occup"]').click();
})
