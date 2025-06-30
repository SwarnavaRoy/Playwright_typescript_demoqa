import { expect, Locator, Page } from "@playwright/test";

export class WebTablePage {
    private addButton: Locator;
    private firstName: Locator;
    private lastName: Locator;
    private email: Locator;
    private age: Locator;
    private salary: Locator;
    private department: Locator;
    private submitButton: Locator;
    private searchField: Locator;
    private table: Locator;
    private tableRow: Locator;
    private tableHeader: Locator;

    constructor(private page: Page) {
        this.addButton = page.getByRole('button', { name: 'Add' });
        this.firstName = page.getByRole('textbox', { name: 'First Name' });
        this.lastName = page.getByRole('textbox', { name: 'Last Name' });
        this.email = page.getByRole('textbox', { name: 'name@example.com' });
        this.age = page.getByRole('textbox', { name: 'Age' });
        this.salary = page.getByRole('textbox', { name: 'Salary' });
        this.department = page.getByRole('textbox', { name: 'Department' });
        this.submitButton = page.getByRole('button', { name: 'Submit' });
        this.searchField = page.getByPlaceholder('Type to search');
        this.table = page.locator('.rt-table');
        this.tableRow = this.table.locator('.rt-tr-group');
        this.tableHeader = this.table.locator('.rt-thead');
    }

    async goto() {
        await this.page.goto('https://demoqa.com/webtables');
    }

    async addRecord() {
        await this.addButton.click();
    }

    async fillRecord(data: any) {
        await this.firstName.fill(data.firstName);
        await this.lastName.fill(data.lastName);
        await this.email.fill(data.email);
        await this.age.fill(String(data.age));
        await this.salary.fill(String(data.salary));
        await this.department.fill(data.department);
    }

    async submitRedord() {
        await this.submitButton.click();
    }

    async searchWebTable(searchkey: string) {
        await this.searchField.fill(searchkey);
    }

    async verifyRecordData(data: any) {
        const row = this.tableRow.filter({ hasText: data.email });
        await expect(row).toBeVisible();
        const cells = row.locator('.rt-td');
        await expect(cells.nth(0)).toHaveText(data.firstName);
        await expect(cells.nth(1)).toHaveText(data.lastName);
        await expect(cells.nth(2)).toHaveText(String(data.age))
        await expect(cells.nth(3)).toHaveText(data.email);
        await expect(cells.nth(4)).toHaveText(String(data.salary));
        await expect(cells.nth(5)).toHaveText(data.department);
    }

    async editRecord(data: any) {
        const editButton = this.getEditButton(data.email);
        await editButton.click();
        await this.salary.fill(String(data.salary));
    }

    private getEditButton(email: string): Locator {
        return this.tableRow.filter({ hasText: email }).getByTitle('Edit').getByRole('img');
    }

    async verifyRecordColumnByEmail(email: string, columnName: string, columnValueExpected: string) {
        const row = this.tableRow.filter({ hasText: email });
        const columnIndex = await this.getColumnIndex(columnName);
        const cell = row.locator('.rt-td').nth(columnIndex);
        await expect(cell).toHaveText(columnValueExpected);
    }

    private async getColumnIndex(columnName: string): Promise<number> {
        const headers = this.tableHeader.locator('.rt-th');
        const headerCount = await headers.count();

        for (let i = 0; i < headerCount; i++) {
            const headerText = await headers.nth(i).innerText();
            if (headerText.trim() == columnName)
                return i;
        }
        throw new Error(`Column "${columnName}" not found.`);
    }

    async deleteRecord(data: any) {
        const deleteButton = this.getDeleteButton(data.email);
        await deleteButton.click();
    }

    private getDeleteButton(email: string): Locator {
        return this.tableRow.filter({ hasText: email }).getByTitle('Delete').getByRole('img');
    }

    async isRecordPresent(email: string): Promise<boolean> {
        const row = this.tableRow.filter({ hasText: email });
        return await row.count() > 0;
    }
}