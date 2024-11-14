import { test, expect } from "@playwright/test";
import * as interactionUtils from "../../testingUtils/interactionUtils.js";


const testData = {
    randomQuestionText: `Question ${Math.random()}`,
    randomTopicName: `Topic ${Math.random()}`,
};

test.beforeEach(async ({ page }) => {
    await interactionUtils.loginAsUser(page, true);
});

test.describe('Question Page.', () => {
    test('Creating topic and question in this topic for tests.', async ({ page }) => {
        await interactionUtils.createTopic(page, testData.randomTopicName);
        await interactionUtils.createQuestion(
            page, 
            testData.randomTopicName, 
            testData.randomQuestionText
        );
    });

    test('User can add a new answer option.', async ({ page }) => {
        await interactionUtils.goToTheQuestion(
            page, 
            testData.randomTopicName, 
            testData.randomQuestionText
        );

        const randomOptionText = `Option added ${Date.now()}`;

        await page.fill('textarea[name="option_text"]', randomOptionText);
        await page.locator('#is_correct').click();
        await page.click('button[type="submit"]:has-text("Submit Option")');

        await expect(page.locator('.list-group-item')).toContainText(randomOptionText);
    });

    test('User can delete an answer option.', async ({ page }) => {
        await interactionUtils.goToTheQuestion(
            page, 
            testData.randomTopicName, 
            testData.randomQuestionText
        );

        const correctOption = page.locator('.list-group-item span strong:text("Correct")');

        await expect(correctOption.first()).toHaveText("Correct");

        await page.locator('.list-group-item button:has-text("Delete")').first().click();
    });

    test('User can add multiple options using the "Add Another Option" button.', async ({ page }) => {
        await interactionUtils.goToTheQuestion(
            page, 
            testData.randomTopicName, 
            testData.randomQuestionText
        );

        const firstOptionText = `Option 1 - ${Date.now()}`;
        const secondOptionText = `Option 2 - ${Date.now()}`;
      
        await page.fill('textarea[name="option_text"]', firstOptionText);
        await page.click('button[type="button"]:has-text("Add Another Option")');
      
        await expect(page.locator('#option_text')).toHaveCount(2);
      
        await page.locator('#option_text').last().fill(secondOptionText);
        await page.click('button[type="submit"]:has-text("Submit Option")');
      
        const listItems = page.locator('.list-group-item span');

        await expect(listItems.first()).toContainText(`${firstOptionText} - Incorrect`);
        await expect(listItems.last()).toContainText(`${secondOptionText} - Incorrect`);
    });

    test('Deleting test topic with all related data.', async ({ page }) => {
        await interactionUtils.deleteTopic(page, testData.randomTopicName);
    });
});
