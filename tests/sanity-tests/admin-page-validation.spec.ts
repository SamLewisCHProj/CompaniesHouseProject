import { test, expect } from "@playwright/test";
import { adminPage } from "../../pages/admin-pages";

test.describe("Admin validation tests", () => {
  test("Ensure rooms cannot be created with the same information", async ({
    page,
  }) => {
    const admin = new adminPage(page);
    await admin.adminLogin(page);
    await admin.addRoom(
      "15",
      "Double",
      "true",
      "200",
      ["Views", "Radio", "Refreshments", "TV"],
      false
    );
    await admin.addRoom(
      "15",
      "Double",
      "true",
      "200",
      ["Views", "Radio", "Refreshments", "TV"],
      false
    );
    await expect(
      page.getByText("Room with that number already exists")
    ).toBeVisible();
  });
  test("Ensure room number must be given", async ({ page }) => {
    const admin = new adminPage(page);
    await admin.adminLogin(page);
    await admin.page.getByRole("button", { name: "Create" }).click();
    await expect(page.getByText("Room name must be set")).toBeVisible();
  });
  test("Ensure room price must be given", async ({ page }) => {
    const admin = new adminPage(page);
    await admin.adminLogin(page);
    await admin.roomNumber.fill("Room1");
    await admin.page.getByRole("button", { name: "Create" }).click();
    await expect(
      page.getByText("must be greater than or equal to 1")
    ).toBeVisible();
  });
  test("Remove info and check field validation on bnb information", async ({
    page,
  }) => {
    await page.getByRole("link", { name: "Branding" }).click();
    await page.getByPlaceholder("Enter B&B name").click();
    await page.getByPlaceholder("Enter B&B name").fill("");
    await page.getByPlaceholder("Enter image url").click();
    await page.getByPlaceholder("Enter image url").fill("");
    await page.getByText("Welcome to Shady Meadows, a").click();
    await page.getByText("Welcome to Shady Meadows, a").clear;
    await page.getByPlaceholder("Enter Contact Name").click();
    await page.getByPlaceholder("Enter Contact Name").clear();
    await page.getByPlaceholder("Enter Address").click();
    await page.getByPlaceholder("Enter Address").clear();
    await page.getByPlaceholder("Enter Phone Number").click();
    await page.getByPlaceholder("Enter Phone Number").clear();
    await page.getByPlaceholder("Enter Email Address").click();
    await page.getByPlaceholder("Enter Email Address").clear();
    await page.getByRole("button", { name: "Submit" }).click();
    await expect(page.getByText("Url should not be blank")).toBeVisible();
    await expect(
      page.getByText("Description should not be blank")
    ).toBeVisible();
    await expect(page.getByText("Name should not be blank")).toBeVisible();
    await expect(
      page.getByText("size must be between 3 and 500")
    ).toBeVisible();
    await expect(
      page.getByText("size must be between 10 and 200")
    ).toBeVisible();
    await expect(
      page.getByText("size must be between 3 and 100")
    ).toBeVisible();
    await expect(page.getByText("Email should not be blank")).toBeVisible();
    await expect(page.getByText("Address should not be blank")).toBeVisible();
    await expect(
      page.getByText("Contact Name should not be blank")
    ).toBeVisible();
    await expect(
      page.getByText("must be greater than or equal to 11")
    ).toBeVisible();
    await expect(page.getByText("Phone should not be blank")).toBeVisible();
    await expect(page.getByText("size must be between 3 and 40")).toBeVisible();
  });
});
