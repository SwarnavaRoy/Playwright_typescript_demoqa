import { Page, Locator, expect } from '@playwright/test';

export class SubmissionModalPage {
  constructor(private page: Page) {}

  private getModalCell(value: string): Locator {
    return this.page.getByRole('cell', { name: value });
  }

  async validateSubmission(data: any) {
    await expect(this.getModalCell(`${data.firstName} ${data.lastName}`)).toBeVisible();
    await expect(this.getModalCell(data.email)).toBeVisible();
    await expect(this.getModalCell(data.gender)).toBeVisible();
    await expect(this.getModalCell(data.mobile)).toBeVisible();
    await expect(this.getModalCell(`${data.dob.date} ${data.dob.month},${data.dob.year}`)).toBeVisible();
    await expect(this.getModalCell(data.subjects.join(', '))).toBeVisible();
    await expect(this.getModalCell(data.hobbies.join(', '))).toBeVisible();
    await expect(this.getModalCell('testFileUpload.png')).toBeVisible();
    await expect(this.getModalCell(data.address)).toBeVisible();
    await expect(this.getModalCell(`${data.state} ${data.city}`)).toBeVisible();
  }
}
