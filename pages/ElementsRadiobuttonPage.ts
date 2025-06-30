import { expect, Locator, Page } from "@playwright/test";

export class ElementsRadiobuttonPage {
    private resultText: Locator;
    constructor(private page: Page) {
        this.resultText = this.page.locator('.text-success');
    }

    async goto() {
        await this.page.goto('https://demoqa.com/radio-button');
    }
    async selectOption(label: string) {
        await this.page.getByText(label).click();
    }
    async verifySelection(label: string) {
        // await expect(this.page.getByText('You have selected ' + label)).toBeVisible();
        await expect(this.resultText).toHaveText(label);
    }
    async isOptionSelected(label: string) {
        // return this.page.getByText(label).isChecked();
        return this.page.locator(`#${label.toLowerCase()}Radio`).isChecked();
    }
    async isOptionDisabled(label: string) {
        return this.page.getByText(label).isDisabled();
    }
}