import test, { expect } from "@playwright/test";
import { beforeEach } from "node:test";
import { AlertsPage } from "../pages/AlertsPage";

test.describe('Alert test cases', () => {
    let alertsPage: AlertsPage;

    test.beforeEach(async ({ page }) => {
        alertsPage = new AlertsPage(page);
        await alertsPage.goto();
    });

    test('Trigger simple alert - accept it', async () => {
        await alertsPage.triggerSimpleAlert();
    });

    test('Trigger timed alert - accept it', async () => {
        await alertsPage.triggerDelayedAlert();
        await expect(alertsPage.timedAlertButton).toBeVisible();
    });

    test('Trigger confirm box alert - accept it', async () => {
        await alertsPage.triggerConfirmAlert(true);
        expect(await alertsPage.confirmAlertText.textContent()).toContain('Ok');
    });

    test('Trigger confirm box alert - reject it', async () => {
        await alertsPage.triggerConfirmAlert(false);
        expect(await alertsPage.confirmAlertText.textContent()).toContain('Cancel');
    });

    test('Trigger prompt alert', async () => {
        const name = 'Swarnava';
        await alertsPage.triggerPromptAlert(name);
        await expect(alertsPage.promptResultText).toHaveText(`You entered ${name}`);
    });
});