import { test, expect } from '@playwright/test';
import * as interactionUtils from "../../testingUtils/interactionUtils.js";


test.beforeEach(async ({ page }) => {
  await page.goto("/auth/login");
});

test.describe('Login Page.', () => {
  test('Display the login form.', async ({ page }) => {
    await expect(page.locator('h3')).toHaveText('Login');
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toHaveText('Login');
  });

  test('Show validation error for invalid email format.', async ({ page }) => {
    await page.fill("input[name='email']", "invalid-email");
    await page.fill("input[name='password']", '123');

    await page.click("button[type='submit']");

    await expect(page).toHaveURL("/auth/login");
  });

  test('Login successfully with valid credentials.', async ({ page }) => {
    await interactionUtils.loginAsUser(page, true);

    await expect(page).toHaveURL("/topics");

    await interactionUtils.logOut(page);
  });

  test('Follow the registration link.', async ({ page }) => {
    await page.click('text=Register here');
    await expect(page).toHaveURL("/auth/register");
  });

  test('Follow back to the main page link.', async ({ page }) => {
    await page.click('text=Back');
    await expect(page).toHaveURL("/");
  });
});