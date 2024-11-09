import { test, expect } from "@playwright/test";


test.describe("Navbar.", () => {
  const baseUrl = "http://localhost:7777"; 

  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
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

  test("Follow each navigation link.", async ({ page }) => {
    await page.click("a.nav-link:text('Main')");
    await expect(page).toHaveURL(`${baseUrl}/`);
    await expect(page.locator("h1, h2, h3")).toContainText("Main Page");

    await page.click("a.nav-link:text('Topics')");
    await expect(page).toHaveURL(`${baseUrl}/topics`);
    await expect(page.locator("h1, h2, h3")).toContainText("Topics");

    await page.click("a.nav-link:text('Quiz')");
    await expect(page).toHaveURL(`${baseUrl}/quiz`);
    await expect(page.locator("h1, h2, h3")).toContainText("Quiz");
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
    await expect(page).toHaveURL(`${baseUrl}/auth/login`);
    await expect(page.locator("h1, h2, h3")).toContainText("Login");

    await page.goBack();
    await page.click("a.nav-link[href='/auth/register']");
    await expect(page).toHaveURL(`${baseUrl}/auth/register`);
    await expect(page.locator("h1, h2, h3")).toContainText("Register");
  });

  test("Display user email and logout link when user is authenticated.", async ({ page }) => {
    await page.context().addCookies([{ }]); // make user obj for auth
    await page.goto(baseUrl);

    const userEmail = await page.locator("span.nav-link strong");
    const logoutLink = await page.locator("a.nav-link[href='/auth/logout']");

    await expect(userEmail).toBeVisible();
    await expect(userEmail).toHaveText("user@example.com"); // Update with test user email if needed

    await expect(logoutLink).toBeVisible();
    await expect(logoutLink).toHaveText("Logout");

    await page.click("a.nav-link[href='/auth/logout']");
    await expect(page).toHaveURL(`${baseUrl}/auth/logout`);
  });

  test("Toggle the navbar on mobile view.", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });

    const toggleButton = await page.locator("button.navbar-toggler");
    const navbarContent = await page.locator("#navbarContent");

    await expect(navbarContent).toHaveClass(/collapse/);

    await toggleButton.click();
    await expect(navbarContent).not.toHaveClass(/collapse/);

    await toggleButton.click();
    await expect(navbarContent).toHaveClass(/collapse/);
  });
});

