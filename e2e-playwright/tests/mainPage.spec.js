import { test, expect } from "@playwright/test";


test.describe("Main Page.", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Display the About App content.", async ({ page }) => {
    const heading = await page.locator("h4").first();
    await expect(heading).toHaveText("About app");

    const description = await page.locator("p.lead").nth(0);
    await expect(description).toContainText(
      "This is a web application for repeated practice of learned content through multiple-choice questions."
    );
  });

  test("Display the list of features.", async ({ page }) => {
    const featuresList = await page.locator("ul li.lead");
    const features = [
      "User registration and login with secure password storage using bcrypt.",
      "Admin users can create and delete topics.",
      "Users can add questions to topics with multiple answer options.",
      "Users can answer questions and view feedback on their answers.",
      "API for retrieving random questions and verifying answers.",
      "Automated tests, including end-to-end tests with Playwright.",
      "Cross-origin resource sharing (CORS) support for the API.",
      "Styled using a Bootstrap CDN.",
    ];

    for (let i = 0; i < features.length; i++) {
      await expect(featuresList.nth(i)).toHaveText(features[i]);
    }
  });

  test("Display project overview.", async ({ page }) => {
    const overviewText = await page.locator("p.lead").nth(1);
    
    await expect(overviewText).toContainText("This project is a web application built using a three-tier architecture");
    await expect(overviewText).toContainText("Deno");
    await expect(overviewText).toContainText("Oak framework");
    await expect(overviewText).toContainText("PostgreSQL");
    await expect(overviewText).toContainText("Flyway for database migrations");
  });

  test("Display correct statistics.", async ({ page }) => {
    const topicsCount = await page.locator("li.list-group-item").nth(0);
    const questionsCount = await page.locator("li.list-group-item").nth(1);
    const answersCount = await page.locator("li.list-group-item").nth(2);

    await expect(topicsCount).toContainText("Topics:");
    await expect(topicsCount.locator("span.badge")).toHaveClass(/bg-primary/);

    await expect(questionsCount).toContainText("Questions:");
    await expect(questionsCount.locator("span.badge")).toHaveClass(/bg-success/);

    await expect(answersCount).toContainText("Answers:");
    await expect(answersCount.locator("span.badge")).toHaveClass(/bg-warning/);
  });
});
