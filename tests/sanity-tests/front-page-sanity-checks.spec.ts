import { test, expect, Page } from "@playwright/test";
import { adminPage } from "../../pages/admin-pages";
import { frontPage } from "../../pages/front-page";

test.describe("Sanity Checks", () => {
  const firstName = "room";
  const lastName = "booker";
  const email = "room@test.com";
  const mobileNumber = "01234567890";
  test("Book a room", async ({ page }) => {
    const form = new frontPage(page);
    const admin = new adminPage(page);
    await page.goto("https://automationintesting.online/");
    await page.locator(".col-sm-7 > .btn").first().click();
    // change the month to avoid clashes with other candidates
    await page.getByRole("button", { name: "Next" }).click();
    await page.getByRole("button", { name: "Next" }).click();
    // find the correct days of the month
    const source = page.locator("div").filter({ hasText: /^16$/ });
    const target = page.locator("div").filter({ hasText: /^20$/ });

    const sourceBox = await source.boundingBox();
    const targetBox = await target.boundingBox();
    // drag and drop the mouse from the start date to the end date.
    if (sourceBox && targetBox) {
      await page.mouse.move(
        sourceBox.x + sourceBox.width / 2,
        sourceBox.y + sourceBox.height / 2
      );
      await page.mouse.down();
      await page.waitForTimeout(500);
      await page.mouse.move(
        targetBox.x + targetBox.width / 2,
        targetBox.y + targetBox.height / 2,
        { steps: 20 }
      );
      await page.mouse.up();
      await page.waitForTimeout(500);
    }
    // fill the form and book
    await form.fillBookingForm(page, firstName, lastName, email, mobileNumber);
    await expect(
      page.getByRole("heading", { name: "Booking Successful!" })
    ).toBeVisible();
    // check messages for booking
    await admin.adminLogin(page);
    await admin.verifyBooking(page, firstName, lastName, email, mobileNumber);
  });

  test("Send enquiry", async ({ page }) => {
    await page.goto("https://automationintesting.online/");
    const uniqueSubject = Date.now();
    const form = new frontPage(page);
    const admin = new adminPage(page);
    const subject = `Help me! ${uniqueSubject}`;
    const description = "I really need some help with my booking!";
    await form.fillContactForm(
      page,
      firstName,
      email,
      mobileNumber,
      subject,
      description
    );
    await admin.adminLogin(page);
    await admin.verifyEnquiry(page, subject, description);
  });
});
