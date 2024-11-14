import { test, expect } from "@playwright/test";
import * as interactionUtils from "../../testingUtils/interactionUtils.js";


const testData = {
    randomTopicName: `Topic: ${Math.random()}`,
    randomQuestionText: `Question: ${Math.random()}`,
}

test.beforeEach(async ({ page }) => {
    await interactionUtils.loginAsUser(page, true);
});

test.describe('Topic Page.', () => {
    test('Creating topic for tests.', async ({ page }) => {
        await interactionUtils.createTopic(page, testData.randomTopicName);
    });

    test('User should be able to see the list of questions.', async ({ page }) => {
        await interactionUtils.goToTheTopic(page, testData.randomTopicName);
        
        const questionsList = page.locator('.list-group-item');
        const emptyMessage = page.locator('text=No questions available yet. Be the first to ask a question!');

        if (await questionsList.count() > 0)
            await expect(questionsList).toBeVisible();
        else 
            await expect(emptyMessage).toBeVisible();
    });

    test('User be able to ask a question.', async ({ page}) => {
        await interactionUtils.goToTheTopic(page, testData.randomTopicName);
        
        await page.fill('textarea[name="question_text"]', testData.randomQuestionText);
        await page.click('button[type="submit"]:has-text("Ask Question")');
        
        await expect(page.locator('.list-group-item')).toContainText(testData.randomQuestionText);
    });

    test('Deleting test topic.', async ({ page }) => {
        await interactionUtils.deleteTopic(page, testData.randomTopicName);
    });
});

