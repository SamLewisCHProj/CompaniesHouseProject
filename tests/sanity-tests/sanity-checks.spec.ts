import { test, expect } from "@playwright/test";
import { adminLogin } from "../../common";

test.describe("Sanity Checks", () => {
  const firstName = "room";
  const lastName = "booker";
  const email = "room@test.com";
  const mobileNumber = "01234567890";
  test("Book a room", async ({ page }) => {
    const source = page.locator("div").filter({ hasText: /^17$/ });
    const target = page.locator("div").filter({ hasText: /^20$/ });

    const sourceBox = await source.boundingBox();
    const targetBox = await target.boundingBox();

    await page.goto("https://automationintesting.online/");
    await page.locator(".col-sm-7 > .btn").first().click();
    await page.getByRole("button", { name: "Next" }).click();
    await page.getByRole("button", { name: "Next" }).click();

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
    await page.getByPlaceholder("Firstname").click();
    await page.getByPlaceholder("Firstname").fill(`${firstName}`);
    await page.getByPlaceholder("Lastname").click();
    await page.getByPlaceholder("Lastname").fill(`${lastName}`);
    await page.locator('input[name="email"]').click();
    await page.locator('input[name="email"]').fill(`${email}`);
    await page.locator('input[name="phone"]').click();
    await page.locator('input[name="phone"]').fill(`${mobileNumber}`);
    await page.getByRole("button", { name: "Book", exact: true }).click();
    await expect(
      page.getByRole("heading", { name: "Booking Successful!" })
    ).toBeVisible();

    // log in to admin
    adminLogin(page)
    // check messages for booking
    await page.goto("https://automationintesting.online/#/admin/messages");
    await page.getByText(`${firstName} ${lastName}`).click();
    await expect(page.getByText(`Email: ${email}`)).toBeVisible();
    await expect(
      page.getByText(`From: ${firstName} ${lastName}`)
    ).toBeVisible();
    await expect(page.getByText(`Phone: ${mobileNumber}`)).toBeVisible();
  });

  test("Send message to email address", async ({ page }) => {
    await page.goto("https://automationintesting.online/");
    const firstName = "test";
    const lastName = "user";
    const email = "testing@test.com";
    const mobileNumber = "01234567890";

    // log in to admin
    await page.goto("https://automationintesting.online/#/admin");
    const username = page.getByTestId("username");
    const password = page.getByTestId("password");
    await username.fill("admin");
    await password.fill("password");
    await page.getByTestId("submit").click();

    // check messages for booking
    await page.goto("https://automationintesting.online/#/admin/messages");
    await page.getByText(`${firstName} ${lastName}`).click();
    await expect(page.getByText(`Email: ${email}`)).toBeVisible();
    await expect(
      page.getByText(`From: ${firstName} ${lastName}`)
    ).toBeVisible();
    await expect(page.getByText(`Phone: ${mobileNumber}`)).toBeVisible();
  });
});
