import { test, expect } from '@playwright/test';
import * as fixtureService from "../../../services/fixtureService.js";


test.beforeEach(async ({ page }) => {
  await page.goto("/auth/register");
});

test.describe('Registration Page', () => {
  test('Display the registration form', async ({ page }) => {
    await expect(page.locator('h3')).toHaveText('Registration');
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('input[name="verification"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toHaveText('Create Account');
  });

  test('Show validation error for password mismatch', async ({ page }) => {
    await page.fill('input[name="email"]', 'user@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.fill('input[name="verification"]', 'diffgdfghfghgh');
    await page.click('button[type="submit"]');

    await expect(page.locator('.alert-danger')).toBeVisible();
    await expect(page.locator('.alert-danger li')).toContainText('the value does not match the password');
  });

  test('Register successfully with valid data.', async ({ page }) => {
    const randomEmail = `${Math.random()}@test.com`;

    await page.fill('input[name="email"]', randomEmail);
    await page.fill('input[name="password"]', 'password123');
    await page.fill('input[name="verification"]', 'password123');
    
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL("/auth/login");

    await fixtureService.deleteUserByEmail(randomEmail);
  });

  test('Follow to login link.', async ({ page }) => {
    await page.click('text=Login here');
    await expect(page).toHaveURL("/auth/login");
  });

  test('Follow back to the main page link.', async ({ page }) => {
    await page.click('text=Back');
    await expect(page).toHaveURL("/");
  });
});