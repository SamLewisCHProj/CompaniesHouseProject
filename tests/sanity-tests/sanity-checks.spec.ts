import { test, expect, Page } from "@playwright/test";
import { adminLogin } from "../../common";
import { frontPage } from "../../pages/front-page";

test.describe("Sanity Checks", () => { 
  const firstName = "room";
  const lastName = "booker";
  const email = "room@test.com";
  const mobileNumber = "01234567890";
  test("Book a room", async ({ page }) => {
    await page.goto("https://automationintesting.online/");
    await page.locator(".col-sm-7 > .btn").first().click();
    await page.getByRole("button", { name: "Next" }).click();
    await page.getByRole("button", { name: "Next" }).click();
    const source = page.locator("div").filter({ hasText: /^09$/ });
    const target = page.locator("div").filter({ hasText: /^13$/ });
    const form = new frontPage(page);
    const sourceBox = await source.boundingBox();
    const targetBox = await target.boundingBox();

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
    await form.fillBookingForm(page, firstName, lastName, email, mobileNumber)
    adminLogin(page);
    // check messages for booking
    await page.goto("https://automationintesting.online/#/admin/messages");
    await page.getByText(`${firstName} ${lastName}`).click();
    await expect(page.getByText(`Email: ${email}`)).toBeVisible();
    await expect(
      page.getByText(`From: ${firstName} ${lastName}`)
    ).toBeVisible();
    await expect(page.getByText(`Phone: ${mobileNumber}`)).toBeVisible();
  });

  test("Send enquiry", async ({ page }) => {
    await page.goto("https://automationintesting.online/");
    const uniqueSubject = Date.now();
    const form = new frontPage(page);
    const subject = `Help me! ${uniqueSubject}`
    const description = "I really need some help with my booking!"
    await form.fillContactForm(
      page,
      firstName,
      email,
      mobileNumber,
      subject,
      description
    );
    adminLogin(page);
    await page.goto("https://automationintesting.online/#/admin/messages");
    await page.getByText(subject).click();
    await expect(page.getByText(description)).toBeVisible();
    await page.getByRole("button", { name: "Close" }).click();
  });
});
