import { Locator, Page } from "@playwright/test";

export class AlertsPage {
    private simpleAlertButton: Locator;
    timedAlertButton: Locator;
    private confirmAlertButton: Locator;
    private promptAlertButton: Locator;
    confirmAlertText: Locator;
    promptResultText: Locator;

    constructor(private page: Page) {
        this.simpleAlertButton = page.locator('#alertButton');
        this.timedAlertButton = page.locator('#timerAlertButton');
        this.confirmAlertButton = page.locator('#confirmButton');
        this.promptAlertButton = page.locator('#promtButton');
        this.confirmAlertText = page.locator('#confirmResult');
        this.promptResultText = page.locator('#promptResult');
    }

    async goto() {
        await this.page.goto('https://demoqa.com/alerts');
    }

    async triggerSimpleAlert() {
        await this.simpleAlertButton.click();
        this.page.on('dialog', async (dialog) => {
            console.log(dialog.message());
            await dialog.accept();
        });
    }

    async triggerDelayedAlert() {
        await this.timedAlertButton.click();
        this.page.once('dialog', async (dialog) => {
            console.log(dialog.message());
            await dialog.accept();
        });
    }

    async triggerConfirmAlert(confirm: boolean) {    
        this.page.once('dialog', async (dialog) => {
            console.log('Here is the message' + dialog.message() + ' and confirm value is ' + confirm);
            confirm ? await dialog.accept() : await dialog.dismiss();
        });
        await this.confirmAlertButton.click();
        await this.page.pause();
    }

    async triggerPromptAlert(message: string) {
        let dialogHandled = false;

        this.page.once('dialog', async (dialog) => {
            console.log('Prompt message:', dialog.message());
            await dialog.accept(message);
            dialogHandled = true;
        });

        await this.promptAlertButton.click();
        // Wait for dialog handler to complete
        await this.page.waitForTimeout(500); // optional small buffer
        // Verify it was handled
        if (!dialogHandled) {
            throw new Error('Prompt dialog was not handled.');
        }
    }
}