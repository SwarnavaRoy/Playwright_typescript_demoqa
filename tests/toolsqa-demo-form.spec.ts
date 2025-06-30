import { test } from '@playwright/test'

test('toolsqa demo form submission', async ({ page }) => {
    const formLink = page.getByText('Forms');
    const practiseForm = page.getByText('Practice Form');
    const firstname = page.getByRole('textbox', { name: 'First Name' });
    const lastname = page.getByRole('textbox', { name: 'Last Name' });
    const email = page.getByRole('textbox', { name: 'name@example.com' });
    // const femaleGender = page.getByLabel('Female');
    // const maleRadio = page.locator('label[for="gender-radio-1"]');
    const maleRadio = page.getByText('Male', { exact: true });
    const mobilenumber = page.getByPlaceholder('Mobile Number');
    const dateofbirth = page.locator('#dateOfBirthInput');
    const subjectsInput = page.locator('#subjectsInput');

    await page.goto('https://demoqa.com/');

    await formLink.click();
    await practiseForm.click();
    await page.pause();
    // Hide ad iframe to avoid click interception
    await page.evaluate(() => {
        const adBanner = document.getElementById('fixedban');
        if (adBanner) adBanner.style.display = 'none';

        const rightAd = document.getElementById('RightSide_Advertisement');
        if (rightAd) rightAd.style.display = 'none';
    });

    await firstname.fill('Swarnava');
    await lastname.fill('Roy');
    await email.fill('shiffo.social@gmail.com');
    // await page.getByLabel('Female').click();
    // await page.locator('#gender-radio-2').check();
    // await femaleRadio.scrollIntoViewIfNeeded();
    await maleRadio.click();

    // await page.pause();
    await mobilenumber.fill('8240703540');
    await dateofbirth.fill('28 June 1990');

    // await page.pause();
    // Select "Maths"
    await subjectsInput.fill('Maths');
    await page.waitForSelector('.subjects-auto-complete__option', { state: 'visible' });
    await page.keyboard.press('Enter');

    // Select "Computer Science"
    await subjectsInput.fill('Computer Science');
    await page.waitForSelector('.subjects-auto-complete__option', { state: 'visible' });
    await page.keyboard.press('Enter');

    // await page.getByLabel('Sports').click();
    // await page.getByLabel('Music').click();
    // const sportsCheckbox = page.locator('label[for="hobbies-checkbox-1"]');
    const sportsCheckbox = page.getByText('Sports')
    await sportsCheckbox.click();
    // const musicCheckbox = page.locator('label[for="hobbies-checkbox-3"]');
    const musicCheckbox = page.getByText('Music');
    await musicCheckbox.click();

    // const selectState = page.locator('#react-select-3-input');
    // selectState.click();
    // selectState.fill('NCR');
    // await page.locator('#react-select-3-option-0').click();

    // const selectCity = page.locator('#react-select-4-input');
    // selectCity.click();
    // selectCity.fill('Delhi');
    // await page.locator('#react-select-4-option-0').click();

    await page.locator('#state svg').click();
    await page.getByText('NCR', { exact: true }).click();
    await page.locator('#city svg').click();
    await page.getByText('Noida', { exact: true }).click();

    const filePath = "/Users/swarnavaroy/Desktop/testFileUpload.png";
    await page.setInputFiles('#uploadPicture', filePath);

    const currentAddress = page.getByRole('textbox', { name: 'Current Address' });
    currentAddress.fill("50, 1st Main Road, NMR Layout");

    const submitBtn = page.getByRole('button', { name: 'Submit' });
    submitBtn.click();

    await page.pause();
});