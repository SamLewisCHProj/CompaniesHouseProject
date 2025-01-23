import { Page, Locator, expect } from "@playwright/test";

export class adminPage {
  page: Page;
  usernameField: Locator;
  passwordField: Locator;
  submitUserInfoButton: Locator;
  roomOptionDropdown: Locator;
  accessibleRoomDropdown: Locator;
  roomNumber: Locator;
  roomPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameField = page.getByTestId("username");
    this.passwordField = page.getByTestId("password");
    this.submitUserInfoButton = page.getByTestId("submit");
    this.roomOptionDropdown = page.locator("#type");
    this.accessibleRoomDropdown = page.locator("#accessible");
    this.roomNumber = page.getByTestId("roomName");
    this.roomPrice = page.locator("#roomPrice");
  }
  async adminLogin(page: Page) {
    await page.goto("https://automationintesting.online/#/admin");
    await this.usernameField.fill("admin");
    await this.passwordField.fill("password");
    await this.submitUserInfoButton.click();
  }
  async verifyBooking(
    page: Page,
    firstName: string,
    lastName: string,
    email: string,
    mobile: string
  ) {
    await page.goto("https://automationintesting.online/#/admin/messages");
    await page.getByText(`${firstName} ${lastName}`).last().click();
    await expect(page.getByText(`Email: ${email}`)).toBeVisible();
    await expect(
      page.getByText(`From: ${firstName} ${lastName}`)
    ).toBeVisible();
    await expect(page.getByText(`Phone: ${mobile}`)).toBeVisible();
  }
  async verifyEnquiry(page: Page, subject: string, description: string) {
    await page.goto("https://automationintesting.online/#/admin/messages");
    await page.getByText(subject).click();
    await expect(page.getByText(description)).toBeVisible();
    await page.getByRole("button", { name: "Close" }).click();
  }
  async roomType(type: "Single" | "Twin" | "Double" | "Family" | "Suite") {
    let value: string;
    switch (type) {
      case "Single":
        value = "Single";
        break;
      case "Twin":
        value = "Twin";
        break;
      case "Double":
        value = "Double";
        break;
      case "Family":
        value = "Family";
        break;
      case "Suite":
        value = "Suite";
        break;
      default:
        throw new Error("No room type selected");
    }
    await this.roomOptionDropdown.selectOption(value);
  }
  async roomAccessible(type: "true" | "false") {
    let value: string;
    switch (type) {
      case "true":
        value = "true";
        break;
      case "false":
        value = "false";
        break;
      default:
        throw new Error("No room accessibility specified");
    }
    await this.accessibleRoomDropdown.selectOption(value);
  }
  async roomFeatures(
    options: Array<"Wifi" | "TV" | "Radio" | "Refreshments" | "Safe" | "Views">
  ) {
    if (options.length == 0) {
    }
    const validOptions = [
      "Wifi",
      "TV",
      "Radio",
      "Refreshments",
      "Safe",
      "Views",
    ];
    for (const option of options) {
      if (!validOptions.includes(option)) {
        throw new Error(`Invalid option selected ${option}`);
      }
      await this.page.getByLabel(option).check();
    }
  }
  async addRoom(
    number: string,
    type: "Single" | "Double" | "Twin",
    accessibility: "true" | "false",
    price: string,
    options: Array<"Wifi" | "TV" | "Radio" | "Refreshments" | "Safe" | "Views">
  ) {
    const roomNumberTaken = await this.page
      .locator(`\ text="${number}"`)
      .count();
    if (roomNumberTaken > 0) {
      return;
    }
    await this.roomNumber.fill(number);
    await this.roomType(type);
    await this.roomAccessible(accessibility);
    await this.roomPrice.fill(price);
    await this.roomFeatures(options);
    await this.page.getByRole("button", { name: "Create" }).click();
  }
}
