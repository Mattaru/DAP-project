import { test, expect } from "@playwright/test";
import * as userUtils from "../testingUtils/userUtils.js";


test.describe("Navbar.", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Display the brand logo.", async ({ page }) => {
    const brandLogo = await page.locator("a.navbar-brand");
    await expect(brandLogo).toHaveText("DAP");
    await expect(brandLogo).toHaveAttribute("href", "/");
  });

  test("Display navigation links.", async ({ page }) => {
    const mainLink = await page.locator("a.nav-link").nth(0);
    const topicsLink = await page.locator("a.nav-link").nth(1);
    const quizLink = await page.locator("a.nav-link").nth(2);

    await expect(mainLink).toHaveText("Main");
    await expect(mainLink).toHaveAttribute("href", "/");

    await expect(topicsLink).toHaveText("Topics");
    await expect(topicsLink).toHaveAttribute("href", "/topics");

    await expect(quizLink).toHaveText("Quiz");
    await expect(quizLink).toHaveAttribute("href", "/quiz");
  });

  test("Follow each navigation link as not authenticated user.", async ({ page }) => {
    await page.click("a.nav-link:text('Main')");
    await expect(page).toHaveURL("/");

    await page.click("a.nav-link:text('Topics')");
    await expect(page).toHaveURL("/auth/login");

    await page.goBack();

    await page.click("a.nav-link:text('Quiz')");
    await expect(page).toHaveURL("/auth/login");
  });

  test("Display login and register links when user is not authenticated.", async ({ page }) => {
    const loginLink = await page.locator("a.nav-link[href='/auth/login']");
    const registerLink = await page.locator("a.nav-link[href='/auth/register']");

    await expect(loginLink).toBeVisible();
    await expect(loginLink).toHaveText("Login");

    await expect(registerLink).toBeVisible();
    await expect(registerLink).toHaveText("Register");
  });

  test("Follow login and register links.", async ({ page }) => {
    await page.click("a.nav-link[href='/auth/login']");
    await expect(page).toHaveURL("/auth/login");

    await page.goBack();

    await page.click("a.nav-link[href='/auth/register']");
    await expect(page).toHaveURL("/auth/register");
  });

  test("Display user email and logout link when user is authenticated.", async ({ page }) => {
    await userUtils.loginAsUser(page, {
      email: "admin@admin.com",
      password: "123456"
    });

    await page.goto("/");
    await page.reload();

    const userEmail = page.locator("span.nav-link strong");
    const logoutLink = page.locator("a.nav-link[href='/auth/logout']");

    await expect(userEmail).toBeVisible({ timeout: 10000 });
    await expect(userEmail).toHaveText("admin@admin.com");

    await expect(logoutLink).toBeVisible();

    await userUtils.logOut(page);

    await expect(page).toHaveURL("/auth/login");
  });

  test("Follow each navigation link as authenticated user.", async ({ page }) => {
    await userUtils.loginAsUser(page, {
      email: "admin@admin.com",
      password: "123456"
    });

    await page.click("a.nav-link:text('Main')");
    await expect(page).toHaveURL("/");

    await page.click("a.nav-link:text('Topics')");
    await expect(page).toHaveURL("/topics");

    await page.goBack();

    await page.click("a.nav-link:text('Quiz')");
    await expect(page).toHaveURL("/quiz");

    await userUtils.logOut(page);
  });

  test("Toggle the navbar on mobile view.", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });

    const toggleButton = page.locator("button.navbar-toggler");
    const navbarContent = page.locator("#navbarContent");

    await toggleButton.click();
    
    await expect(navbarContent).toBeVisible({ timeout: 10000 });
    await expect(navbarContent).toHaveClass(/collapse show/);

    await toggleButton.click();
    
    await expect(navbarContent).toHaveClass(/collapse/);
    await expect(navbarContent).not.toHaveClass(/show/);
  });
});

