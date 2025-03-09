const { test } = require('@playwright/test');


test('iframe',async({page})=>{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    const framePage= page.frameLocator('#courses-iframe');
    await framePage.locator("[href*='lifetime-access']").first().click();
    const testCheck=await framePage.locator('.text h2').textContent();
    
    console.log(testCheck.split(' ')[1])
})