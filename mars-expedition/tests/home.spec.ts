import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test('page loads', async ({ page }) => {
    // Check if the page has loaded by checking the title.
    const title = await page.title();
    expect(title).toBe('Mars Expedition');
});

test('sign up button works', async ({ page }) => {
    await page.getByTestId('signup-button').click();
    expect(page.url()).toContain('/signup');
});

test('login button works', async ({ page }) => {
    await page.getByTestId('login-button').click();
    expect(page.url()).toContain('/login');
});

test('start the journey button works', async ({ page }) => {
    await page.getByTestId('start-journey-button').click();
    expect(page.url()).toContain('/signup');
});
