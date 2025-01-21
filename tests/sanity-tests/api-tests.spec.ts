import { test, expect, Page } from "@playwright/test";

test('Book a room using API', async ({request}) => {
    const response = await request.post('https://automationintesting.online/booking/', {
        headers: {
            'Content-Type': 'application/json'
          },
        data: {"bookingdates":{"checkin":"2025-05-08","checkout":"2025-05-11"},"depositpaid":false,"firstname":"api","lastname":"booking","roomid":1,"email":"apiemail@email.com","phone":"01234567890"}
    })
    expect(response.status()).toBe(201);

})