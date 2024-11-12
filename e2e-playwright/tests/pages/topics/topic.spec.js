import { test, expect } from "@playwright/test";
import * as fixtureSrvice from "../../../services/fixtureService.js";
import * as userUtils from "../../testingUtils/userUtils.js";


test.describe('Topic Page.', () => {
    const testData = {
        randomEmail: `${Math.random()}@email.com`,
        randomPassword: Math.random(),
        randomTopicName: `Topic: ${Math.random()}`,
        randomQuestionText: `Question: ${Math.random()}`,
        userFromDb: null,
        topicFromDb: null,
    }

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        let page = await context.newPage();

        await userUtils.registerNewUser(
            page, 
            testData.randomEmail, 
            String(testData.randomPassword)
        );
        testData.userFromDb = await fixtureSrvice.getUserByEmail(testData.randomEmail);
        
        await fixtureSrvice.createTopic(testData.randomTopicName, testData.userFromDb.id);
        testData.topicFromDb = await fixtureSrvice.getTopicByName(testData.randomTopicName);

        await page.close();
    });

    test.beforeEach(async ({ page }) => {
        await userUtils.loginAsUser(page, {
            email: testData.randomEmail,
            password: String(testData.randomPassword),
        });

        await page.goto("/topics");
    });
    
    test('User should be able to see the list of questions.', async ({ page }) => {
        await page.goto("/topics");

        await page.click(`.list-group-item a:text("${testData.randomTopicName}")`);
        
        const questionsList = page.locator('.list-group-item');
        const emptyMessage = page.locator('text=No questions available yet. Be the first to ask a question!');

        if (await questionsList.count() > 0)
            await expect(questionsList).toBeVisible();
        else 
            await expect(emptyMessage).toBeVisible();
    });

    test('User be able to ask a question.', async ({ page}) => {
        await page.click(`.list-group-item a:text("${testData.randomTopicName}")`); 
        
        await page.fill('textarea[name="question_text"]', testData.randomQuestionText);
        await page.click('button[type="submit"]:has-text("Ask Question")');
        
        await expect(page.locator('.list-group-item')).toContainText(testData.randomQuestionText);
    });

    test.afterAll(async () => {
        await fixtureSrvice.deleteTopicByUserId(testData.userFromDb.id);
        await fixtureSrvice.deleteUserByEmail(testData.userFromDb.email);
    });
});

