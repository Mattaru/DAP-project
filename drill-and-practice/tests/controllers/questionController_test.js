import { assertEquals } from "https://deno.land/std@0.207.0/testing/asserts.ts";
import { describe, it} from "https://deno.land/std/testing/bdd.ts";
import { superoak } from "https://deno.land/x/superoak@4.7.0/mod.ts";
import * as questionController from "../../routes/controllers/questionController.js";
import * as mocks from "../mockUtils/mocks.js";


describe('POST /topics/:id/questions - questionController.createQuestion', async () =>{
    it('Add a question with valid data.', async () => {
        const mockCreateQuestion = async (ctx) => {
            ctx.params.id = mocks.mockTopicService.randomTopic.id;
            ctx.user = mocks.mockUsers.regularUser;
            await questionController.createQuestion(ctx, undefined, mocks.mockQuestionService);
        };

        const path = `/topics/${mocks.mockTopicService.randomTopic.id}/question`;
        const app = mocks.getMockAppWithRouter("POST", path, mockCreateQuestion);

        const request = await superoak(app);
        const response = await request
        .post(path)
        .send(`question_text=${mocks.mockQuestionService.randomQuestion.question_text}`);
        
        assertEquals(response.status, 302);
        assertEquals(response.get("location"), `/topics/${mocks.mockTopicService.randomTopic.id}`);
    });

    it('Can`t add a question with invalid data.', async () => {
        const mockCreateQuestion = async (ctx) => {
            ctx.params.id = mocks.mockTopicService.randomTopic.id;
            ctx.render = (view, data) => mocks.mockRender(ctx, view, data);
            ctx.user = mocks.mockUsers.regularUser;
            await questionController.createQuestion(ctx, undefined, mocks.mockQuestionService, mocks.mockTopicService);
        };

        const path = `/topics/${mocks.mockTopicService.randomTopic.id}/question`;
        const app = mocks.getMockAppWithRouter("POST", path, mockCreateQuestion);

        const request = await superoak(app);
        const response = await request
        .post(path)
        .send(`question_text=`);
        
        assertEquals(response.status, 200);
        assertEquals(response.body.view, "./pages/topics/topic.eta");
        assertEquals(response.body.data, {
            question_text: "",
            topic: mocks.mockTopicService.randomTopic,
            validationErrors: {
                question_text: {
                    required: "question_text is required",
                },
            },
        });
    });
});

Deno.test('POST /topics/:id/questions/:qId/delete - questionController.deleteQuestion', async () => {
    const mockDeleteQuestion = async (ctx) => {
        ctx.params.id = mocks.mockTopicService.randomTopic.id;
        ctx.params.qId = mocks.mockQuestionService.randomQuestion.id;
        await questionController.deleteQuestion(ctx, undefined, mocks.mockQuestionService, mocks.mockQuestionOptionsService);
    };

    const path = `/topics/${mocks.mockTopicService.randomTopic.id}/questions/${mocks.mockQuestionService.randomQuestion.id}/delete`;
    const app = mocks.getMockAppWithRouter("POST", path, mockDeleteQuestion);

    const request = await superoak(app);
    const response = await request.post(path);

    assertEquals(response.status, 302);
    assertEquals(response.get("location"), `/topics/${mocks.mockTopicService.randomTopic.id}`);
});

Deno.test('GET /topics/:id/questions/:qId - questionController.viewQuestion', async () => {
    const mockViewQuestion = async (ctx) => {
        ctx.params.id = mocks.mockTopicService.randomTopic.id;
        ctx.params.qId = mocks.mockQuestionService.randomQuestion.id;
        ctx.render = (view, data) => mocks.mockRender(ctx, view, data);
        await questionController.viewQuestion(ctx, undefined, mocks.mockQuestionService, mocks.mockQuestionOptionsService);
    };

    const path = `/topics/${mocks.mockTopicService.randomTopic.id}/questions/${mocks.mockQuestionService.randomQuestion.id}`;
    const app = mocks.getMockAppWithRouter("POST", path, mockViewQuestion);

    const request = await superoak(app);
    const response = await request.post(path);

    assertEquals(response.status, 200);
    assertEquals(response.body.view, "./pages/questions/question.eta");
    assertEquals(response.body.data, {
        topic: {id: mocks.mockTopicService.randomTopic.id},
        question: mocks.mockQuestionService.randomQuestion,
        options: mocks.mockQuestionOptionsService.randomQOption,
    })
});
