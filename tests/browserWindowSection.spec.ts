import { test, expect } from "@playwright/test";
import { BrowserWindowsPage } from "../pages/BrowserWindowsPage";

test('click on new tab and validate tab opened', async ({ page, context }) => {
    const browserWindowPage = new BrowserWindowsPage(page);
    await browserWindowPage.goto();
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        browserWindowPage.openNewTab()
    ]);
    await newPage.waitForLoadState();
    expect(await newPage.locator('#sampleHeading').textContent()).toEqual('This is a sample page');
});

test('open and validate new page', async ({ context, page }) => {
    const browserWindowPage = new BrowserWindowsPage(page);
    await browserWindowPage.goto();
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        browserWindowPage.openNewWindow()
    ]);
    expect(await newPage.textContent('h1')).toContain('This is a sample page');
});

test('open new message window and validate content', async ({ context, page }) => {
    const browserWindowPage = new BrowserWindowsPage(page);
    await browserWindowPage.goto();
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        browserWindowPage.openMessageWindow()
    ]);
    await newPage.waitForLoadState();
    const content = await newPage.evaluate(()=>document.body.textContent);
    expect(content).toContain('Knowledge increases by sharing but not by saving.');
});