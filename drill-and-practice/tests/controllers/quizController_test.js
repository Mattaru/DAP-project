import { assertEquals } from "https://deno.land/std@0.207.0/testing/asserts.ts";
import { describe, it} from "https://deno.land/std/testing/bdd.ts";
import { superoak } from "https://deno.land/x/superoak@4.7.0/mod.ts";
import * as quizController from "../../routes/controllers/quizController.js";
import * as mocks from "../mockUtils/mocks.js";


describe('TEST - quizController', async () => {
    const topicId = mocks.mockTopicService.randomTopic.id;
    const questionId = mocks.mockQuestionService.randomQuestion.id;

    describe('POST /quiz/:tId/questions/:qId/options - quizController.checkOptions', async () => {
        it('Answer is right.', async () => {
            const mockcheckOptions = async (ctx) => {
                ctx.params.qId = questionId;
                ctx.user = mocks.mockUsers.regularUser;
                ctx.render = (view, data) => mocks.mockRender(ctx, view, data);
                await quizController.checkOptions(ctx, undefined, mocks.mockAnswerService, mocks.mockQuestionService);
            };
    
            const path = `/quiz/${topicId}/questions/${questionId}options`;
            const app = mocks.getMockAppWithRouter("POST", path, mockcheckOptions);
    
            const request = await superoak(app);
            const response = await request
            .post(path)
            .send("3=on");
    
            assertEquals(response.status, 200);
            assertEquals(response.body.view, "/pages/quiz/results.eta");
            assertEquals(response.body.data, {
                correct: true,
                topic_id: topicId,
            });
        });
    
        it('Answer is wrong.', async () => {
            const mockcheckOptions = async (ctx) => {
                ctx.params.qId = questionId;
                ctx.user = mocks.mockUsers.regularUser;
                ctx.render = (view, data) => mocks.mockRender(ctx, view, data);
                await quizController.checkOptions(ctx, undefined, mocks.mockAnswerService, mocks.mockQuestionService);
            };
    
            const path = `/quiz/${topicId}/questions/${questionId}options`;
            const app = mocks.getMockAppWithRouter("POST", path, mockcheckOptions);
    
            const request = await superoak(app);
            const response = await request
            .post(path)
            .send("1=on&3=on");
    
            assertEquals(response.status, 200);
            assertEquals(response.body.view, "/pages/quiz/results.eta");
            assertEquals(response.body.data, {
                question: mocks.mockQuestionService.getQuestionWithOptionsById()
            });
        });
    });

    describe('GET /quiz/:tId - quizController.getRandomQuestion', async () => {
        it('Get a questin.', async () => {
            const mockGetRandomQuestion = async (ctx) => {
                ctx.params.tId = topicId;
                await quizController.getRandomQuestion(ctx, undefined, mocks.mockQuestionService);
            };

            const app = mocks.getMockAppWithRouter("GET", `/quiz/${topicId}`, mockGetRandomQuestion);

            const request = await superoak(app);
            const response = await request
            .get(`/quiz/${topicId}`);

            assertEquals(response.status, 302);
            assertEquals(response.get("location"), `/quiz/${topicId}/questions/${questionId}`);
        });
        
        it('DB have not questions yet.', async () => {
            mocks.mockQuestionService.getRandomQuestionByTopicId = mocks.mockQuestionService.retunNull;

            const mockGetRandomQuestion = async (ctx) => {
                ctx.params.tId = topicId;
                ctx.render = (view, data) => mocks.mockRender(ctx, view, data);
                await quizController.getRandomQuestion(ctx, undefined, mocks.mockQuestionService);
            };

            const app = mocks.getMockAppWithRouter("GET", `/quiz/${topicId}`, mockGetRandomQuestion);

            const request = await superoak(app);
            const response = await request
            .get(`/quiz/${topicId}`);

            assertEquals(response.status, 200);
            assertEquals(response.body.view, "./pages/quiz/results.eta");
            assertEquals(response.body.data, {questionNotExist: true});
        });
    });

    it('GET /quiz - quizController.viewAllTopics', async () => {
        const mockViewAllTopics = async (ctx) => {
            ctx.render = (view, data) => mocks.mockRender(ctx, view, data);
            await quizController.viewAllTopics(ctx, undefined, mocks.mockTopicService);
        };

        const app = mocks.getMockAppWithRouter("GET", `/quiz`, mockViewAllTopics);

        const request = await superoak(app);
        const response = await request
        .get(`/quiz`);
        
        assertEquals(response.status, 200);
        assertEquals(response.body.view, "./pages/quiz/quiz.eta");
        assertEquals(response.body.data, {
            topics: mocks.mockTopicService.findAll()
        });
    });

    it('GET /quiz/:tId/questions/:qId - quizController.viewRandomQuestion', async () => {
        const mockViewRandomQuestion = async (ctx) => {
            ctx.render = (view, data) => mocks.mockRender(ctx, view, data);
            await quizController.viewRandomQuestion(ctx, undefined, mocks.mockQuestionService);
        };

        const path = `/quiz/${topicId}/questions/${questionId}`;
        const app = mocks.getMockAppWithRouter("GET", path, mockViewRandomQuestion);

        const request = await superoak(app);
        const response = await request
        .get(path);
        
        assertEquals(response.status, 200);
        assertEquals(response.body.view, "./pages/quiz/rQuestion.eta");
        assertEquals(response.body.data, {
            question: mocks.mockQuestionService.getQuestionWithOptionsById()
        });
    });
});

