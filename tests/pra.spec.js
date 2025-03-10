const {test ,expect}=require('@playwright/test');
test('Browser context playwright',async ({browser})=>{
   const context=await browser.newContext();
   const page=await context.newPage();
   const userName=await page.locator('#username');
   const singIn= await page.locator('#signInBtn');
   await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
   await userName.fill("rahulshettyacademy11");
   await singIn.click();
   console.log( await page.locator("[style*='block']").textContent());
   await expect(page.locator("[style*='block']")).toContainText("Empty username/password.")


 
  //console.log( await page.locator("[style*='block']")).textContent())
  // username/password.
  //await page.locator('#usertype').toContainText('Admin').click()
});
test("signin error message 'Incorrect username/password.' ",async({browser})=>{
    const context=await browser.newContext();
    const page=await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName= page.locator('#username');
    const passWord= page.locator('#password');
    const singIn= page.locator('#signInBtn');
    await userName.fill("rahulshettyacademy11");
    await passWord.fill("learning");
    await singIn.click();
    await expect(page.locator("[style*='block']")).toContainText("Incorrect username/password.")

})
test.skip("signin ",async({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName= page.locator('#username');
    const passWord= page.locator('#password');
    const singIn= page.locator('#signInBtn');
    await userName.fill("rahulshettyacademy");
    await passWord.fill("learning");
    await singIn.click();
    await page.waitForSelector('h3', { state: 'visible' });
    await expect(page.locator('#burgundy').nth(2)).toContainText('Filters');

    //await expect(page.locator('h3',{hasText :'Automation'})).toBeVisible()//toContainText('Automation')
})
test.skip("click on first item  ",async({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName= page.locator('#username');
    const passWord= page.locator('#password');
    const singIn= page.locator('#signInBtn');
    const cardTitles= page.locator('.card-body a')
    await userName.fill("rahulshettyacademy");
    await passWord.fill("learning");
    await singIn.click();
    await expect(page.locator('h1')).toContainText('Shop Name');
    console.log(await cardTitles.first().textContent())
    console.log(await cardTitles.nth(1).textContent());
    console.log(await cardTitles.last().textContent());
    console.log(await cardTitles.allTextContents())

});
test.skip('Assignment',async({page})=>{
    await page.goto("https://rahulshettyacademy.com/client/");
    const emailId=page.locator('#userEmail');
    const passWord=page.locator('#userPassword');
    const logIn=page.locator('[value="Login"]') 
    await emailId.fill("veenaamar25@gmail.com")
    await passWord.fill('Aa84842181541')
    await logIn.click();
    await page.waitForLoadState('networkidle')
    await page.locator('h3').waitFor();
   console.log( await page.locator('h3').first().waitFor().allTextContents());
    await expect(page.locator('h3')).toContainText('Automation')
})
test('page playwright test',async ({page})=>{
    await page.goto("https://google.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google")
})

