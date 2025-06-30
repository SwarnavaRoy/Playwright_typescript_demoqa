import { Locator, Page } from "@playwright/test";

export class BrowserWindowsPage {
    private newTabButton: Locator;
    private newWidnowButton: Locator;
    private newWindowMessageButton: Locator;

    constructor(private page: Page) {
        this.newTabButton = page.locator('#tabButton');
        this.newWidnowButton = page.locator('#windowButton');
        this.newWindowMessageButton = page.locator('#messageWindowButton');
    }

    async goto(){
        await this.page.goto('https://demoqa.com/browser-windows');
    }

    async openNewTab(){
        await this.newTabButton.click();
    }
    
    async openNewWindow(){
        await this.newWidnowButton.click();
    }

    async openMessageWindow(){
        await this.newWindowMessageButton.click();
    }
}