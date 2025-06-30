import { expect, test } from '@playwright/test';
import baseData from '../data/baseData.json';
import { mergeTestData } from '../utils/testDataUtil';
import { ElementsTextboxPage } from '../pages/ElementsTextboxPage';
import { ElementsCheckboxPage } from '../pages/ElementsCheckboxPage';
import { ElementsRadiobuttonPage } from '../pages/ElementsRadiobuttonPage';
import { WebTablePage } from '../pages/WebTablePage';

test('submit textbox input and validate the submitted data', async ({ page }) => {
    const textboxPage = new ElementsTextboxPage(page);
    await textboxPage.goto();
    await textboxPage.fillBasicInfo(baseData);
    await textboxPage.submit();
    await textboxPage.validateSubmitData(baseData);
});

test('select checkbox and validate selection', async ({ page }) => {
    const checkboxPage = new ElementsCheckboxPage(page);
    await checkboxPage.goto();
    await checkboxPage.expandAllCheckbox();
    const options = ['Desktop', 'Documents', 'Downloads'];
    await checkboxPage.selectMultipleCheckbox(options);
    await checkboxPage.verifySelection(options);
});

test('select radio button and verify selection', async ({ page }) => {
    const radiobuttonPage = new ElementsRadiobuttonPage(page);
    await radiobuttonPage.goto();
    const option = 'Impressive';
    await radiobuttonPage.selectOption(option);
    await radiobuttonPage.verifySelection(option);
});

test('verify only one option is selected at a time', async ({ page }) => {
    const radiobuttonPage = new ElementsRadiobuttonPage(page);
    await radiobuttonPage.goto();
    await radiobuttonPage.selectOption('Yes');
    expect(await radiobuttonPage.isOptionSelected('Yes')).toBeTruthy();
    expect(await radiobuttonPage.isOptionSelected('Impressive')).toBeFalsy();
    expect(await radiobuttonPage.isOptionDisabled('No')).toBeTruthy();
});

//////// Tests for WebTable //////////////

test('add a record in webtables page and validate the record data in table', async ({ page }) => {
    const webtablePage = new WebTablePage(page);
    await webtablePage.goto();
    await webtablePage.addRecord();
    await webtablePage.fillRecord(baseData);
    await webtablePage.submitRedord();
    await webtablePage.searchWebTable(baseData.email);
    await webtablePage.verifyRecordData(baseData);
    await page.pause();
});

test('edit a record and validate', async ({ page }) => {
    const data = { "email": "kierra@example.com", "salary": 2010300 };
    const webtablePage = new WebTablePage(page);
    await webtablePage.goto();
    await webtablePage.editRecord(data);
    await webtablePage.submitRedord();
    await webtablePage.verifyRecordColumnByEmail(data.email, 'Salary', String(data.salary));
});

test('delete a record and validate deletion from table', async ({ page }) => {
    const webtablePage = new WebTablePage(page);
    await webtablePage.goto();
    await webtablePage.addRecord();
    await webtablePage.fillRecord(baseData);
    await webtablePage.submitRedord();
    await page.pause()
    await webtablePage.deleteRecord(baseData);
    expect(await webtablePage.isRecordPresent(baseData.email)).toBeFalsy();
});