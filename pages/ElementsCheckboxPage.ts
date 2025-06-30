import { expect, Locator, Page } from "@playwright/test";

export class ElementsCheckboxPage {
    private expandAllButton: Locator;
    private resultArea: Locator;

    constructor(private page: Page) {
        this.expandAllButton = page.getByRole('button', { name: 'Expand all' });
        this.resultArea = page.locator('#result');
    }

    async goto() {
        await this.page.goto('https://demoqa.com/checkbox');
    }

    async expandAllCheckbox() {
        await this.expandAllButton.click();
    }

    async selectCheckbox(label: string) {
        await this.page.locator('label').filter({ hasText: label }).getByRole('img').first().click();
    }

    async selectMultipleCheckbox(labels: string[]) {
        for (const label of labels) {
            await this.selectCheckbox(label);
        }
    }

    async verifySelection(labels: string[]) {
        for (const label of labels) {
            await expect(this.resultArea.getByText(label.toLowerCase(), { exact: true })).toBeVisible();
        }
    }
}