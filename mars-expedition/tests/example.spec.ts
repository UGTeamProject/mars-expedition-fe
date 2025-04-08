import { Page, test } from '@playwright/test';

const login = async (page: Page) => {
    const email = process.env.VITE_USERNAME;
    const password = process.env.VITE_PASSWORD;
    if (!email || !password) {
        throw Error(`Missing email and/or password! ${JSON.stringify({ email, password })}`);
    }
    await page.goto('/login');
    await page.getByTestId('usernameOrEmail').fill(email);
    await page.getByTestId('password').fill(password);
    await page.getByTestId('login-button').click();
};

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});
