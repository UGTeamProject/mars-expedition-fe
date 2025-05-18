import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test('page loads', async ({ page }) => {
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

test('back to colony button redirects to 401 when user is not authorized', async ({ page }) => {
    await page.getByTestId('back-button').click();
    expect(page.url()).toContain('/not-authorized');
});

test('back to colony button redirects to the game when user is authorized', async ({ page }) => {
    await page.addInitScript(() => {
        window.localStorage.setItem('keycloak_token', 'mocked-token');
    });
    await page.getByTestId('back-button').click();
    expect(page.url()).toContain('/play');
});

test('page redirects to 404 when trying to access unavailable resource', async ({ page }) => {
    await page.goTo('/something');
    expect(page.url()).toContain('/not-found');
});