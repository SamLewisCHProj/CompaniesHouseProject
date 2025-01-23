import { test, expect, Page } from "@playwright/test";
import { adminPage } from "../../pages/admin-pages";

test.describe("Sanity Checks", () => {
  test("Book a room using API", async ({ request, page }) => {
    const admin = new adminPage(page);
    await admin.adminLogin(page);
    await admin.addRoom("15", "Double", "true", "200", [
      "Views",
      "Radio",
      "Refreshments",
      "TV",
    ]);
    const response = await request.post(
      "https://automationintesting.online/booking/",
      {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          bookingdates: { checkin: "2025-05-08", checkout: "2025-05-11" },
          depositpaid: false,
          firstname: "api",
          lastname: "booking",
          roomid: 15,
          email: "apiemail@email.com",
          phone: "01234567890",
        },
      }
    );
    expect(response.status()).toBe(201);
    const responseText = await response.text();
    console.log(`Response body: ${responseText}`);
  });
  test("Negative API test - Use incorrect date", async ({ request }) => {
    const response = await request.post(
      "https://automationintesting.online/booking/",
      {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          bookingdates: { checkin: "2025-05-90", checkout: "2025-05-90" },
          depositpaid: false,
          firstname: "fail",
          lastname: "fail",
          roomid: 15,
          email: "apiemail@email.com",
          phone: "01234567890",
        },
      }
    );
    expect(response.status()).toBe(400);
    const responseText = await response.text();
    console.log(`Response body: ${responseText}`);
  });
  test("Negative API test - Use empty names", async ({ request }) => {
    const response = await request.post(
      "https://automationintesting.online/booking/",
      {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          bookingdates: { checkin: "2025-07-01", checkout: "2025-07-03" },
          depositpaid: false,
          firstname: "",
          lastname: "",
          roomid: 15,
          email: "apiemail@email.com",
          phone: "01234567890",
        },
      }
    );
    expect(response.status()).toBe(400);
    const responseText = await response.text();
    console.log(`Response body: ${responseText}`);
  });
  test("Negative API test - Use invalid room number", async ({ request }) => {
    const response = await request.post(
      "https://automationintesting.online/booking/",
      {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          bookingdates: { checkin: "2025-07-01", checkout: "2025-07-03" },
          depositpaid: false,
          firstname: "fail",
          lastname: "fail",
          roomid: 11231,
          email: "apiemail@email.com",
          phone: "01234567890",
        },
      }
    );
    expect(response.status()).toBe(400);
    const responseText = await response.text();
    console.log(`Response body: ${responseText}`);
  });
  test("Negative API test - Use invalid phone number", async ({ request }) => {
    const response = await request.post(
      "https://automationintesting.online/booking/",
      {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          bookingdates: { checkin: "2025-07-01", checkout: "2025-07-03" },
          depositpaid: false,
          firstname: "fail",
          lastname: "fail",
          roomid: 15,
          email: "apiemail@email.com",
          phone: "this is not a number",
        },
      }
    );
    expect(response.status()).toBe(400);
    const responseText = await response.text();
    console.log(`Response body: ${responseText}`);
  });
  test("Negative API test - Use invalid email", async ({ request }) => {
    const response = await request.post(
      "https://automationintesting.online/booking/",
      {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          bookingdates: { checkin: "2025-07-01", checkout: "2025-07-03" },
          depositpaid: false,
          firstname: "fail",
          lastname: "fail",
          roomid: 15,
          email: "a",
          phone: "01234567890",
        },
      }
    );
    expect(response.status()).toBe(400);
    const responseText = await response.text();
    console.log(`Response body: ${responseText}`);
  });
});
