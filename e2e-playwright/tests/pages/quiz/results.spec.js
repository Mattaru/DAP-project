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

test.describe("Quiz Results Page.", () => {
    test("Display correct answer message.", async ({ page }) => {
        await page.locator(`.list-group-item:has-text("${testData.randomOptionsNames[0]}") input[type="checkbox"]`).check();
        await page.locator('button[type="submit"]').click();

        const successAlert = page.locator(".alert-success");
        await expect(successAlert).toBeVisible();
        await expect(successAlert).toContainText("Correct Answer!");

        const nextQuestionButton = page.locator('a.btn-primary');
        await expect(nextQuestionButton).toBeVisible();
        await expect(nextQuestionButton).toHaveAttribute("href", `/quiz/${testData.topicId}`);
    });

    test("Display incorrect answer message with correct options listed.", async ({ page }) => {
        await page.locator(`.list-group-item:has-text("${testData.randomOptionsNames[1]}") input[type="checkbox"]`).check();
        await page.locator('button[type="submit"]').click();

        const errorAlert = page.locator(".alert-danger");
        await expect(errorAlert).toBeVisible();
        await expect(errorAlert).toContainText("Incorrect Answer!");

        const correctOptionLocator = page.locator(`.list-group-item-success:has-text("${testData.randomOptionsNames[0]}")`);
        await expect(correctOptionLocator).toBeVisible();

        const nextQuestionButton = page.locator('a.btn-primary');
        await expect(nextQuestionButton).toBeVisible();
        await expect(nextQuestionButton).toHaveAttribute("href", `/quiz/${testData.topicId}`);
    });
});