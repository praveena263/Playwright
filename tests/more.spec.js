import {test,expect} from '@playwright/test';

test.skip('more-1',async({page})=>{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await page.goto('https://www.google.com/');
    await page.goBack()
    await page.goForward()
    //use this 
    //npx playwright test tests/more.spec.js --headed --debug
})
test('more-2',async({page})=>{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await page.locator('#hide-textbox').click();
    await expect(page.getByPlaceholder("Hide/Show Example")).toBeHidden()
    //use this 
    //npx playwright test tests/more.spec.js --headed --debug
})