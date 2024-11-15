import { test, expect } from "@playwright/test";
import * as fixtureService from "../../../services/fixtureService.js";
import * as interactionUtils from "../../testingUtils/interactionUtils.js";


const testData = {
    randomOptionsNames: [
        `Option ${Math.random()}`,
        `Option ${Math.random()}`,
        `Option ${Math.random()}`
    ],
    randomQuestionText: `Q: ${Math.random()}`,
    randomTopicName: `Topic ${Math.random()}`,
    questionId: null,
    topicId: null,
};

test.beforeEach(async ({ page }) => {
    await interactionUtils.loginAsUser(page, true);
    await interactionUtils.createTopic(page, testData.randomTopicName);
    await interactionUtils.goToTheTopic(page, testData.randomTopicName);
    await interactionUtils.createQuestion(page, testData.randomTopicName, testData.randomQuestionText);
    await interactionUtils.goToTheQuestion(page, testData.randomTopicName, testData.randomQuestionText);
    await interactionUtils.createQuestionOptions(page, testData.randomOptionsNames);

    const topic = await fixtureService.getTopicByName(testData.randomTopicName);
    const question = await fixtureService.getQuestionByText(testData.randomQuestionText);

    testData.questionId = question.id;
    testData.topicId = topic.id;

    page.goto(`/quiz/${topic.id}/questions/${question.id}`);
});

test.afterEach(async ({ page }) => {
    await interactionUtils.deleteTopic(page, testData.randomTopicName);
});

test.describe("Random Question Page.", () => {
    test('Display question text and options.', async ({ page }) => {
        const questionLocator = page.locator('h4');
        await expect(questionLocator).toContainText(testData.randomQuestionText);

        const optionsList = page.locator(".list-group-item");
        const optionsCount = await optionsList.count();
        expect(optionsCount).toBeGreaterThan(0);

        for (const optionText of testData.randomOptionsNames) {
            const optionLocator = page.locator(`.list-group-item:has-text("${optionText}")`);
            await expect(optionLocator).toBeVisible();
        }
    });

    test('Allow selecting options and submitting the form.', async ({ page }) => {
        for (const optionText of testData.randomOptionsNames) {
            const checkboxLocator = page.locator(`.list-group-item:has-text("${optionText}") input[type="checkbox"]`);
            await checkboxLocator.check();
        }

        await page.locator('button[type="submit"]').click();

        await expect(page).toHaveURL(/\/quiz\/[^/]+\/questions\/[^/]+(\/options)?$/);
    });
});