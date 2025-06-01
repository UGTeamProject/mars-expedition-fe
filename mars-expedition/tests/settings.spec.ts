import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
    await page.addInitScript(() => {
        localStorage.setItem('keycloak_token', 'mocked-token');
    });

    await page.goto('/settings');
});

test('page loads', async ({ page }) => {
    await expect(page.getByText('Account')).toBeVisible();
});

test('manage account button redirects to keycloak', async ({ async }) => {
    await page.getByTestId('manage-account-button').click();
    expect(page.url()).toContain('/realms/mars/account');
});

test('reset button shows confirmation dialog when clicked', async ({ page }) => {
    await page.getByTestId('reset-button').click();
    await expect(page.getByTestId('reset-dialog')).toBeVisible();
});