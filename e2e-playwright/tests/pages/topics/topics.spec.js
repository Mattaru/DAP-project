import { test, expect } from "@playwright/test";
import * as fixtureSrvice from "../../../services/fixtureService.js";
import * as interactionUtils from "../../testingUtils/interactionUtils.js";


const testData = {
  randomTopicName: `Topic ${Math.random()}`
}

test.beforeEach(async ({ page }) => {
  await interactionUtils.loginAsUser(page, true);
});

test.describe('Topics Page.', () => {
  test('Adding user for tests to the database.', async ({ page }) => {
    await interactionUtils.registerNewUser(page);
  });

  test('Display the topics list.', async ({ page }) => {
    await expect(page.locator('h4')).toHaveText('Topics');

    const topicsList = page.locator('.list-group');
    const emptyMessage = page.locator('text=No topics available.');

    if (await topicsList.count() > 0) 
      await expect(topicsList).toBeVisible();
    else 
      await expect(emptyMessage).toBeVisible();
  });

  test('Admin should be able to create a new topic.', async ({ page }) => {
    const createForm = page.locator('form[action="/topics"]');
    await expect(createForm).toBeVisible();

    await page.fill('input[name="name"]', testData.randomTopicName);
    await page.click('button[type="submit"]:has-text("Create topic")');

    await expect(page.locator(`.list-group-item a:text("${testData.randomTopicName}")`)).toBeVisible();
  });

  test('Admin should be able to delete a topic.', async ({ page }) => {
    const topicLocator = page.locator(`.list-group-item:has-text("${testData.randomTopicName}")`);
    await expect(topicLocator).toBeVisible();

    await topicLocator.locator('button[type="submit"]:has-text("Delete")').click();

    await expect(page.locator(`.list-group-item:has-text("${testData.randomTopicName}")`)).not.toBeVisible();
  });

  test('Regular user should not see the create topic form.', async ({ page }) => {
    await interactionUtils.logOut(page);

    await interactionUtils.loginAsUser(page);

    const createForm = page.locator('form[action="/topics"]');
    await expect(createForm).not.toBeVisible();
  });

  test('Deleting test user from the database.', async () => {
    await interactionUtils.deleteTestUser();
  });
});