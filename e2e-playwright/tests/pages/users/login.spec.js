import { test, expect } from '@playwright/test';
import * as userUtils from "../../testingUtils/userUtils.js";


test.describe('Login Page.', () => {
  const baseUrl = 'http://host.docker.internal:7777';

  test.beforeEach(async ({ page }) => {
    await page.goto(`${baseUrl}/auth/login`);
  });

  test('Display the login form.', async ({ page }) => {
    await expect(page.locator('h3')).toHaveText('Login');
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toHaveText('Login');
  });

  test('Show validation error for invalid email format.', async ({ page }) => {
    await userUtils.loginAsUser(page, baseUrl, {
        email: "invali-email",
        password: "password123"
    });

    await expect(page).toHaveURL(`${baseUrl}/auth/login`);
  });

  test('Login successfully with valid credentials.', async ({ page }) => {
    await userUtils.loginAsUser(page, baseUrl, {
        email: "admin@admin.com",
        password: "123456"
    });

    await expect(page).toHaveURL(`${baseUrl}/topics`);

    await userUtils.logOut(page);
  });

  test('Follow the registration link.', async ({ page }) => {
    await page.click('text=Register here');
    await expect(page).toHaveURL(`${baseUrl}/auth/register`);
  });

  test('Follow back to the main page link.', async ({ page }) => {
    await page.click('text=Back');
    await expect(page).toHaveURL(`${baseUrl}/`);
  });
});