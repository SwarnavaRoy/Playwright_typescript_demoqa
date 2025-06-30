import { Page, Locator } from '@playwright/test';

export class FormPage {
  private firstNameInput: Locator;
  private lastNameInput: Locator;
  private emailInput: Locator;
  private genderOption: (gender: string) => Locator;
  private mobileInput: Locator;
  private dateOfBirthInput: Locator;
  private yearDropdown: Locator;
  private subjectInput: Locator;
  private hobbyOption: (hobby: string) => Locator;
  private uploadButton: Locator;
  private addressInput: Locator;
  private stateDropdown: Locator;
  private cityDropdown: Locator;
  private submitButton: Locator;

  constructor(private page: Page) {
    this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
    this.emailInput = page.getByRole('textbox', { name: 'name@example.com' });
    this.genderOption = (gender) => page.getByText(gender, { exact: true });
    this.mobileInput = page.getByRole('textbox', { name: 'Mobile Number' });
    this.dateOfBirthInput = page.locator('#dateOfBirthInput');
    this.yearDropdown = page.getByRole('combobox').nth(1);
    this.subjectInput = page.locator('#subjectsInput');
    this.hobbyOption = (hobby) => page.getByText(hobby, { exact: true });
    this.uploadButton = page.getByRole('button', { name: 'Select picture' });
    this.addressInput = page.getByRole('textbox', { name: 'Current Address' });
    this.stateDropdown = page.locator('#state svg');
    this.cityDropdown = page.locator('#city svg');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
  }

  async goto() {
    await this.page.goto('https://demoqa.com/automation-practice-form');
  }

  async fillBasicInfo(data: any) {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.emailInput.fill(data.email);
    await this.genderOption(data.gender).click();
    await this.mobileInput.fill(data.mobile);
  }

  async selectDOB(dob: any) {
    await this.dateOfBirthInput.click();
    await this.yearDropdown.selectOption(dob.year);
    await this.page.getByRole('option', { name: new RegExp(`${dob.month} ${dob.date}`) }).click();
  }

  async selectSubjects(subjects: string[]) {
    for (const subject of subjects) {
      await this.subjectInput.fill(subject);
      // await this.page.waitForTimeout(300);
      // await this.page.waitForSelector(`text="${subject}"`);
      // getByText finds both: the input's value (1st match) and dropdown option (2nd match)
      await this.page.getByText(subject, { exact: true }).nth(1).click();
    }
  }

  async selectHobbies(hobbies: string[]) {
    for (const hobby of hobbies) {
      await this.hobbyOption(hobby).click();
    }
  }

  async uploadPicture(path: string) {
    await this.uploadButton.setInputFiles(path);
  }

  async fillAddress(address: string) {
    await this.addressInput.fill(address);
  }

  async selectStateAndCity(state: string, city: string) {
    await this.stateDropdown.click();
    await this.page.getByText(state, { exact: true }).click();
    await this.cityDropdown.click();
    await this.page.getByText(city, { exact: true }).click();
  }

  async submit() {
    await this.submitButton.click();
  }
}
