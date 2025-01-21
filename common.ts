import { Page } from "@playwright/test";

export async function adminLogin(page: Page) {
  await page.goto("https://automationintesting.online/#/admin");
  const username = page.getByTestId("username");
  const password = page.getByTestId("password");
  await username.fill("admin");
  await password.fill("password");
  await page.getByTestId("submit").click();
}
