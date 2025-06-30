import { test, expect } from '@playwright/test';

test('fill out the practice form', async ({ page }) => {
    // const browser = await chromium.launch({
    //     headless: false
    // });
    // const context = await browser.newContext();
    // const page = await context.newPage();
    await page.goto('https://demoqa.com/automation-practice-form');
    await page.getByRole('textbox', { name: 'First Name' }).click();
    await page.getByRole('textbox', { name: 'First Name' }).fill('Swarnava');
    await page.getByRole('textbox', { name: 'First Name' }).press('Tab');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Roy');
    await page.getByRole('textbox', { name: 'Last Name' }).press('Tab');
    await page.getByRole('textbox', { name: 'name@example.com' }).fill('shiffo.social@gmail.com');
    await page.getByText('Male', { exact: true }).click();
    await page.getByRole('textbox', { name: 'Mobile Number' }).click();
    await page.getByRole('textbox', { name: 'Mobile Number' }).fill('8240703540');
    await page.locator('#dateOfBirthInput').click();
    await page.getByRole('combobox').nth(1).selectOption('1990');
    await page.getByRole('option', { name: 'Choose Thursday, June 28th,' }).click();
    await page.locator('.subjects-auto-complete__value-container').click();
    await page.locator('#subjectsInput').fill('maths');
    await page.getByText('Maths', { exact: true }).click();
    await page.locator('#subjectsInput').fill('comp');
    await page.getByText('Computer Science', { exact: true }).click();
    await page.getByText('Sports').click();
    await page.getByText('Music').click();
    // await page.getByRole('button', { name: 'Select picture' }).click();
    await page.getByRole('button', { name: 'Select picture' }).setInputFiles('/Users/swarnavaroy/Desktop/testFileUpload.png');
    await page.getByRole('textbox', { name: 'Current Address' }).click();
    await page.getByRole('textbox', { name: 'Current Address' }).fill('50, 1st Main Road, NMR Layout, Bangalore');
    // await page.locator('#state path').click();
    // await page.locator('#state svg').click();
    // await page.getByText('NCR', { exact: true }).click();
    // await page.locator('#city path').click();
    // await page.locator('#city path').click();
    // await page.locator('div').filter({ hasText: /^Select City$/ }).nth(3).click();
    // await page.getByText('Noida', { exact: true }).click();

    await page.locator('#state svg').click();
    await page.getByText('NCR', { exact: true }).click();
    await page.locator('#city svg').click();
    await page.getByText('Noida', { exact: true }).click();
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByRole('cell', { name: 'Swarnava Roy' }).click({
        button: 'right'
    });
    await page.getByRole('cell', { name: 'Male' }).click();
    await page.getByRole('cell', { name: '8240703540' }).click();
    await page.getByRole('cell', { name: 'June,1990' }).click();
    await page.getByRole('cell', { name: 'Maths, Computer Science' }).click();
    await page.getByRole('cell', { name: 'Sports, Music' }).click();
    await page.getByRole('cell', { name: 'testFileUpload.png' }).click();
    await page.getByRole('cell', { name: '50, 1st Main Road, NMR Layout' }).click();
    await page.getByRole('cell', { name: 'NCR Noida' }).click();

    // ---------------------
    // await context.close();
    // await browser.close();
});