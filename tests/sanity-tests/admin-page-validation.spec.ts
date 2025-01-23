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
});
