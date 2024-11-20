import { assertEquals } from "https://deno.land/std@0.207.0/testing/asserts.ts";
import { describe, it} from "https://deno.land/std/testing/bdd.ts";
import { superoak } from "https://deno.land/x/superoak@4.7.0/mod.ts";
import * as questionOptionController from "../../routes/controllers/questionOptionController.js";
import * as mocks from "../mockUtils/mocks.js";


describe('TEST - questionOptionController', async () => {
    const topicId = mocks.mockTopicService.randomTopic.id;
    const questionId = mocks.mockQuestionService.randomQuestion.id;
    const qOptionId = mocks.mockQuestionOptionsService.randomQOption.id;

    describe('POST /topics/:id/questions/:qId/options - questionOptionController.addQuestionOption', async () => {
        it('Add valid options.', async () => {
            const mockAddQuestionOption = async (ctx) => {
                ctx.params.id = topicId;
                ctx.params.qId = questionId;
                await questionOptionController.addQuestionOption(
                    ctx, 
                    undefined, 
                    mocks.mockQuestionService, 
                    mocks.mockQuestionOptionsService
                );
            };
    
            const path = `/topics/${topicId}/questions/${questionId}/options`;
            const app = mocks.getMockAppWithRouter("POST", path, mockAddQuestionOption);
    
            const request = await superoak(app);
            const response =await request
            .post(path)
            .send(`option_text${Math.random()}=rText&is_correct${Math.random()}=on&option_text${Math.random()}=rText`);
    
            assertEquals(response.status, 302);
            assertEquals(
                response.get("location"), 
                `/topics/${topicId}/questions/${questionId}`
            );
        });
    
        it('Can`t add invalid options.', async () => {
            const mockAddQuestionOption = async (ctx) => {
                ctx.params.id = topicId;
                ctx.params.qId = questionId;
                ctx.render = (view, data) => mocks.mockRender(ctx, view, data);
                await questionOptionController.addQuestionOption(
                    ctx, 
                    undefined, 
                    mocks.mockQuestionService, 
                    mocks.mockQuestionOptionsService
                );
            };
    
            const path = `/topics/${topicId}/questions/${questionId}/options`;
            const app = mocks.getMockAppWithRouter("POST", path, mockAddQuestionOption);
    
            const request = await superoak(app);
            const response =await request
            .post(path)
            .send(`option_text=oText&is_correct=on&option_text1=`);
    
            assertEquals(response.status, 200);
            assertEquals(response.body.view, "./pages/questions/question.eta");
            assertEquals(response.body.data, {
                option_text: "oText",
                is_correct: "on",
                option_text1: "",
                errOptions: [
                    {
                        is_correct: "on",
                        option_text: "oText",
                    },
                    {
                        option_text: "",
                    },
                ],
                question: mocks.mockQuestionService.randomQuestion,
                topic: {
                    id: topicId,
                },
                validationErrors: {
                    option_text: {
                        required: "option_text is required",
                    },
                },
            });
        });
    });
    
    it('POST /topics/:id/questions/:qId/options/:oId/delete - questionOptionController.deleteQuestionOption', async () => {
        const mockDeleteQuestionOption = async (ctx) => {
            ctx.params.id = topicId;
            ctx.params.qId = questionId;
            ctx.params.oId = qOptionId;
            await questionOptionController.deleteQuestionOption(ctx, undefined, mocks.mockQuestionOptionsService);
        };
    
        const path = `/topics/${topicId}/questions/${questionId}/options/${qOptionId}/delete`;
        const app = mocks.getMockAppWithRouter("POST", path, mockDeleteQuestionOption);
    
        const request = await superoak(app);
        const response = await request.post(path);
    
        assertEquals(response.status, 302);
        assertEquals(response.get("location"), `/topics/${topicId}/questions/${questionId}`);
    });
});
