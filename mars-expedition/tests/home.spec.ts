import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test('page loads', async ({ page }) => {
    // Check if the page has loaded by checking the title.
    const title = await page.title();
    expect(title).toBe('Mars Expedition');
});

test('sign up button redirects to keycloak', async ({ page }) => {
    await page.getByTestId('signup-button').click();
    expect(page.url()).toContain('/realms/mars/protocol/openid-connect/auth');
});

test('login button redirects to keycloak', async ({ page }) => {
    await page.getByTestId('login-button').click();
    expect(page.url()).toContain('/realms/mars/protocol/openid-connect/auth');
});

test('start the journey button redirects to keycloak', async ({ page }) => {
    await page.getByTestId('start-journey-button').click();
    expect(page.url()).toContain('/realms/mars/protocol/openid-connect/auth');
});
