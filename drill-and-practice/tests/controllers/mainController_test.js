import { assertEquals } from "https://deno.land/std@0.207.0/testing/asserts.ts";
import { superoak } from "https://deno.land/x/superoak@4.7.0/mod.ts";
import { viewMain } from "../../routes/controllers/mainController.js";
import * as mocks from "../mockUtils/mocks.js";


Deno.test("GET / - mainController.viewMain", async () => {
    const mockViewMain = async (ctx) => {
        ctx.render = (view, data) => mocks.mockRender(ctx, view, data);
        await viewMain(
            ctx, 
            undefined,
            mocks.mockAnswerService, 
            mocks.mockQuestionService, 
            mocks.mockTopicService
        );
    };

    const app = mocks.getMockAppWithRouter("GET", "/", mockViewMain);

    const request = await superoak(app);
    const response = await request.get("/");

    assertEquals(response.status, 200);
    assertEquals(response.body.view, "main.eta");
    assertEquals(response.body.data.answersCount, mocks.mockAnswerService.randomAnswersCount);
    assertEquals(response.body.data.questionsCount, mocks.mockQuestionService.randomQuestionsCount);
    assertEquals(response.body.data.topicsCount, mocks.mockTopicService.randomTopicsCount);
});