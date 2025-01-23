import { test, expect } from "@playwright/test";
import { adminPage } from "../../pages/admin-pages";
import { frontPage } from "../../pages/front-page";

test.describe("Field Validation tests", () => {
  const firstName = "room";
  const lastName = "booker";
  const email = "room@test.com";
  const mobileNumber = "01234567890";
  test("Name field validation", async ({ page }) => {
    const form = new frontPage(page);
    await page.goto("https://automationintesting.online/");
    await page.locator(".col-sm-7 > .btn").first().click();
    await form.fillBookingForm(page, "", "", email, mobileNumber);
    await form.bookRoomButton.click();
    await expect(
      page.getByRole("heading", { name: "Booking Successful!" })
    ).not.toBeVisible();
    await expect(page.getByText("Firstname should not be blank")).toBeVisible();
    await expect(page.getByText("Lastname should not be blank")).toBeVisible();
    await expect(page.getByText("size must be between 3 and 18")).toBeVisible();
    await expect(page.getByText("size must be between 3 and 30")).toBeVisible();
  });
  test("email field validation", async ({ page }) => {
    const form = new frontPage(page);
    await page.goto("https://automationintesting.online/");
    await page.locator(".col-sm-7 > .btn").first().click();
    await form.fillBookingForm(page, firstName, lastName, "", mobileNumber);
    await form.bookRoomButton.click();
    await expect(
      page.getByRole("heading", { name: "Booking Successful!" })
    ).not.toBeVisible();
    await expect(page.getByText("must not be empty")).toBeVisible();
    await form.bookingEmail.fill("test");
    await form.bookRoomButton.click();
    await expect(
      page.getByText("must be a well-formed email address")
    ).toBeVisible();
  });
  // this test is failing because the phone number can be text
  test("Phone field validation", async ({ page }) => {
    const form = new frontPage(page);
    await page.goto("https://automationintesting.online/");
    await page.locator(".col-sm-7 > .btn").first().click();
    await form.fillBookingForm(page, firstName, lastName, email, "fj");
    await form.bookRoomButton.click();
    await expect(
      page.getByRole("heading", { name: "Booking Successful!" })
    ).not.toBeVisible();
    await expect(
      page.getByText("size must be between 11 and 21")
    ).toBeVisible();
    await form.bookingPhone.fill("oiuytrewqasdf");
    await expect(page.getByText("must only contain numbers")).toBeVisible();
  });
});
