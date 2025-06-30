import { test } from '@playwright/test';
import baseData from '../data/baseData.json';
import testData from '../data/testData.json';
import { mergeTestData } from '../utils/testDataUtil';
import { FormPage } from '../pages/FormPage';
import { SubmissionModalPage } from '../pages/SubmissionModalPage';

test('form submission and modal validation from Forms -> Practice Form page', async ({ page }) => {
  const customData = testData.standaloneTestData;
  const mergedData = mergeTestData(baseData, customData);

  const formPage = new FormPage(page);
  const modalPage = new SubmissionModalPage(page);

  await formPage.goto();
  await formPage.fillBasicInfo(mergedData);
  await formPage.selectDOB(mergedData.dob);
  await formPage.selectSubjects(mergedData.subjects);
  await formPage.selectHobbies(mergedData.hobbies);
  await formPage.uploadPicture(mergedData.picture);
  await formPage.fillAddress(mergedData.address);
  await formPage.selectStateAndCity(mergedData.state, mergedData.city);
  await formPage.submit();
  await modalPage.validateSubmission(mergedData);
});
