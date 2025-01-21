import { Page, Locator, expect } from "@playwright/test";

export class frontPage {
  private page: Page;
  contactNameBox: Locator;
  contactEmailBox: Locator;
  contactPhoneBox: Locator;
  contactSubjectBox: Locator;
  contactDescriptionBox: Locator;
  submitButton: Locator;
  bookRoomButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.contactNameBox = page.getByTestId("ContactName");
    this.contactEmailBox = page.getByTestId("ContactEmail");
    this.contactPhoneBox = page.getByTestId("ContactPhone");
    this.contactSubjectBox = page.getByTestId("ContactSubject");
    this.contactDescriptionBox = page.getByTestId("ContactDescription");
    this.submitButton = page.getByRole("button", { name: "Submit" });
  }

  async fillContactForm(
    page: Page,
    contactName: string,
    contactEmail: string,
    contactPhone: string,
    contactSubject: string,
    contactDescription: string
  ) {
    await this.contactNameBox.fill(contactName);
    await this.contactEmailBox.fill(contactEmail);
    await this.contactPhoneBox.fill(contactPhone);
    await this.contactSubjectBox.fill(contactSubject);
    await this.contactDescriptionBox.fill(contactDescription);
    await this.submitButton.click();
    await expect(
      page.getByRole("heading", { name: "Thanks for getting in touch" })
    ).toBeVisible();
  }
}
