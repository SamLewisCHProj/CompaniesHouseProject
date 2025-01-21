import { Page, Locator, expect } from "@playwright/test";

export class adminPage {
  page: Page;
  usernameField: Locator;
  passwordField: Locator;
  submitUserInfoButton: Locator;
    
  constructor(page: Page) {
    this.page = page;
    this.usernameField = page.getByTestId("username");
    this.passwordField = page.getByTestId("password");
    this.submitUserInfoButton = page.getByTestId("submit")
  }
  async adminLogin(page: Page) {
    await page.goto("https://automationintesting.online/#/admin");
    await this.usernameField.fill("admin");
    await this.passwordField.fill("password");
    await this.submitUserInfoButton.click();
  }
  async verifyBooking(page:Page,firstName:string, lastName:string, email:string, mobile:string){
    await page.goto("https://automationintesting.online/#/admin/messages");
    await page.getByText(`${firstName} ${lastName}`).last().click();
    await expect(page.getByText(`Email: ${email}`)).toBeVisible();
    await expect(
      page.getByText(`From: ${firstName} ${lastName}`)
    ).toBeVisible();
    await expect(page.getByText(`Phone: ${mobile}`)).toBeVisible();
  }
  async verifyEnquiry(page:Page,subject:string, description: string){
    await page.goto("https://automationintesting.online/#/admin/messages");
    await page.getByText(subject).click();
    await expect(page.getByText(description)).toBeVisible();
    await page.getByRole("button", { name: "Close" }).click();
  }
}

