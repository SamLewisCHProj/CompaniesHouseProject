import { Page, Locator, expect } from "@playwright/test";

export class frontPage {
  page: Page;
  contactNameBox: Locator;
  contactEmailBox: Locator;
  contactPhoneBox: Locator;
  contactSubjectBox: Locator;
  contactDescriptionBox: Locator;
  submitButton: Locator;
  bookRoomButton: Locator;
  bookingFirstName: Locator;
  bookingLastName: Locator;
  bookingEmail: Locator;
  bookingPhone: Locator;

  constructor(page: Page) {
    this.page = page;
    this.contactNameBox = page.getByTestId("ContactName");
    this.contactEmailBox = page.getByTestId("ContactEmail");
    this.contactPhoneBox = page.getByTestId("ContactPhone");
    this.contactSubjectBox = page.getByTestId("ContactSubject");
    this.contactDescriptionBox = page.getByTestId("ContactDescription");
    this.submitButton = page.getByRole("button", { name: "Submit" });
    this.bookingFirstName = page.getByPlaceholder("Firstname");
    this.bookingLastName = page.getByPlaceholder("Lastname");
    this.bookingEmail = page.locator('input[name="email"]');
    this.bookingPhone = page.locator('input[name="phone"]');
    this.bookRoomButton = page.getByRole("button", {
      name: "Book",
      exact: true,
    });
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
  async fillBookingForm(
    page: Page,
    firstName: string,
    lastName: string,
    email: string,
    phone: string
  ) {
    await this.bookingFirstName.fill(`${firstName}`);
    await this.bookingLastName.fill(`${lastName}`);
    await this.bookingEmail.fill(`${email}`);
    await this.bookingPhone.fill(`${phone}`);
    await this.bookRoomButton.click();
  }
}
