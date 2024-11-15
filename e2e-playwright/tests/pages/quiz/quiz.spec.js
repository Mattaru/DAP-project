import { test, expect } from "@playwright/test";
import * as interactionUtils from "../../testingUtils/interactionUtils.js";


const testData = {
    randomOptionsNames: [
        `Option ${Math.random()}`,
        `Option ${Math.random()}`,
        `Option ${Math.random()}`
    ],
    randomQuestionText: `Q: ${Math.random()}`,
    randomTopicName: `Topic ${Math.random()}`,
};

test.describe("Quiz Page.", () => {
    test.beforeEach(async ({ page }) => {
        await interactionUtils.loginAsUser(page, true);
        await interactionUtils.createTopic(page, testData.randomTopicName);
        await interactionUtils.goToTheTopic(page, testData.randomTopicName);
        await interactionUtils.createQuestion(page, testData.randomTopicName, testData.randomQuestionText);
        await interactionUtils.goToTheQuestion(page, testData.randomTopicName, testData.randomQuestionText);
        await interactionUtils.createQuestionOptions(page, testData.randomOptionsNames);
    });

    test.afterEach(async ({ page }) => {
        await interactionUtils.deleteTopic(page, testData.randomTopicName);
    });

    test('Display available quizzes.', async ({ page }) => {
        await page.goto("/quiz");

        const topic = page.locator(`.list-group-item:has(span:text("${testData.randomTopicName}"))`);
        await expect(topic).toBeVisible();
    });

    test('Following to the question link.', async ({ page }) => {
        await page.goto("/quiz");

        const topic = page.locator(`.list-group-item:has(span:text("${testData.randomTopicName}"))`);
        await topic.click();

        await expect(page).toHaveURL(/\/quiz\/[^/]+\/questions\/[^/]+$/);
    });
});