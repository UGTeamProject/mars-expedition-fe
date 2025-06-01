import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
    const shouldSkipAuth = testInfo.title.includes('not authorized');
    if (!shouldSkipAuth) {
        await page.addInitScript(() => {
            localStorage.setItem('keycloak_token', 'mocked-token');
        });
    }

    await page.goto('/play');
});

test('page loads when user is authorized', async ({ page }) => {
    await expect(page.locator('#game-container')).toBeVisible();
});

test('page is redirected to 401 when user is not authorized', async ({ page }) => {
    expect(page.url()).toContain('/not-authorized');
});

test('page redirects to settings', async ({ page }) => {
    await page.getByTestId('settings-button').click();
    expect(page.url()).toContain('/settings');
});

test('user logs out', async ({ page }) => {
    await page.getByTestId('logout-button').click();
    await expect(page.getByTestId('logout-dialog')).toBeVisible();
    await page.getByTestId('confirm-button').click();
    
    await expect(page).toHaveURL('/');
});

test('user cancels logging out', async ({ page }) => {
    await page.getByTestId('logout-button').click();
    await expect(page.getByTestId('logout-dialog')).toBeVisible();
    await page.getByTestId('cancel-button').click();
        
    await expect(page).toHaveURL('/play');
});