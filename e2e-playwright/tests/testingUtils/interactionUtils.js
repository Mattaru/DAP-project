import * as fixtureSrvice from "../../services/fixtureService.js";


const commonData = {
    admin: {
        email: "admin@admin.com",
        password: "123456",
    },
    testUser: {
        email: "test@test.com",
        password: "123456",
    }
};

export const createQuestion = async (page, topicName, questionText) => {
    await goToTheTopic(page, topicName)
        
    await page.fill('textarea[name="question_text"]', questionText);
    await page.click('button[type="submit"]:has-text("Ask Question")');
};

export const createQuestionOptions = async (page, optNamesArr) => {
    await page.fill('textarea[name="option_text"]', optNamesArr[0]);
    await page.locator('#is_correct').click();

    for (let i = 1; i < optNamesArr.length; i++) {
        await page.click('button[type="button"]:has-text("Add Another Option")');
        await page.locator('#option_text').last().fill(optNamesArr[i]);
    }
    
    await page.click('button[type="submit"]:has-text("Submit Option")');
};

export const createTopic = async (page, topicName) => {
    await page.goto("/topics");

    await page.fill('input[name="name"]', topicName);
    await page.click('button[type="submit"]:has-text("Create topic")');
};

export const deleteQuestion = async (page) => {
    await goToTheQuestion(page); 

    await page.click('button[type="submit"]:has-text("Delete Question")');
};

export const deleteTopic = async (page, topicName) => {
    await page.goto("/topics");

    const topicLocator = page.locator(`.list-group-item:has-text("${topicName}")`);

    await topicLocator.locator('button[type="submit"]:has-text("Delete")').click();
};

export const deleteTestUser = async () => {
    await fixtureSrvice.deleteUserByEmail(commonData.testUser.email);
};

export const goToTheQuestion = async (page, topicName, questionText) => {
    await goToTheTopic(page, topicName);

    await page.click(`.list-group-item a:text("${questionText}")`); 
}

export const goToTheTopic = async (page, topicName) => {
    await page.goto("/topics", { waitUntil: "load" });
    
    await page.click(`.list-group-item a:text("${topicName}")`);
};

export const loginAsUser = async (page, admin=false) => {
    await page.goto("/auth/login");
    
    if (admin) {
        await page.fill("input[name='email']", commonData.admin.email);
        await page.fill("input[name='password']", commonData.admin.password);
    } else {
        await page.fill("input[name='email']", commonData.testUser.email);
        await page.fill("input[name='password']", commonData.testUser.password);
    }

    await page.click("button[type='submit']");
};

export const logOut = async (page) => {
    await page.click("a.nav-link[href='/auth/logout']");
};

export const registerNewUser = async (page) => {
    await page.goto("/auth/register");

    await page.fill('input[name="email"]', commonData.testUser.email);
    await page.fill('input[name="password"]', commonData.testUser.password);
    await page.fill('input[name="verification"]', commonData.testUser.password);

    await page.click('button[type="submit"]');
};
