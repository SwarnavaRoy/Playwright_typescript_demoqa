import { expect, Locator, Page } from "@playwright/test";

export class ElementsTextboxPage {
    private fullNameInput: Locator;
    private emailInput: Locator;
    private currentAddressInput: Locator;
    private permanentAddressInput: Locator;
    private submitButton: Locator;

    constructor(private page: Page) {
        this.fullNameInput = page.getByRole('textbox', { name: 'Full Name' });
        this.emailInput = page.getByRole('textbox', { name: 'name@example.com' });
        this.currentAddressInput = page.getByRole('textbox', { name: 'Current Address' });
        this.permanentAddressInput = page.locator('#permanentAddress');
        this.submitButton = page.getByRole('button', { name: 'submit' });
    }

    async goto() {
        await this.page.goto('https://demoqa.com/text-box');
    }

    async fillBasicInfo(data: any) {
        await this.fullNameInput.fill(data.firstName + ' ' + data.lastName);
        await this.emailInput.fill(data.email);
        await this.currentAddressInput.fill(data.currentAddress);
        await this.permanentAddressInput.fill(data.permanentAddress);
    }

    async validateSubmitData(data: any) {
        await expect(this.page.getByText('Name:' + data.firstName + ' ' + data.lastName)).toBeVisible();
        await expect(this.page.getByText('Email:' + data.email)).toBeVisible();
        await expect(this.page.getByText('Current Address :' + data.currentAddress)).toBeVisible();
        await expect(this.page.getByText('Permananet Address :' + data.permanentAddress)).toBeVisible();
    }

    async submit() {
        await this.submitButton.click();
    }
}