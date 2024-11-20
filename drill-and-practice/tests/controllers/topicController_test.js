import { assertEquals } from "https://deno.land/std@0.207.0/testing/asserts.ts";
import { describe, it} from "https://deno.land/std/testing/bdd.ts";
import { superoak } from "https://deno.land/x/superoak@4.7.0/mod.ts";
import * as topicController from "../../routes/controllers/topicController.js";
import * as mocks from "../mockUtils/mocks.js";


describe('TEST - topicController', async () => {
    describe('POST /topics - topicController.createTopic', async () => {
        it('Admin can add a topic with valid data', async () =>{
            mocks.mockTopicService.findTopic = mocks.mockTopicService.returnNull;
    
            const mockCreateTopic = async (ctx) => {
                ctx.user = mocks.mockUsers.admin;
                ctx.render = (view, data) => mocks.mockRender(ctx, view, data);
                await topicController.createTopic(ctx, undefined, mocks.mockTopicService);
            };
    
            const app = mocks.getMockAppWithRouter("POST", "/topics", mockCreateTopic);
    
            const request = await superoak(app);
            const response = await request
            .post("/topics")
            .send(`name=${mocks.mockTopicService.randomTopic.name}`);
    
            assertEquals(response.status, 302);
            assertEquals(response.get("location"), "/topics");
        });
    
        it('Admin can`t add a topic with invalid data', async () =>{
            mocks.mockTopicService.findTopic = mocks.mockTopicService.returnRandomTopic;
    
            const mockCreateTopic = async (ctx) => {
                ctx.user = mocks.mockUsers.admin;
                ctx.render = (view, data) => mocks.mockRender(ctx, view, data);
                await topicController.createTopic(ctx, undefined, mocks.mockTopicService);
            };
    
            const app = mocks.getMockAppWithRouter("POST", "/topics", mockCreateTopic);
    
            const request = await superoak(app);
            const response = await request
            .post("/topics")
            .send(`name=1`);
    
            assertEquals(response.status, 200);
            assertEquals(response.body.view, "./pages/topics/topics.eta");
            assertEquals(response.body.data, {
                name: "1",
                validationErrors: {
                    name: {
                        nameAlreadyExist: "a topic with the same name is already exists",
                    },
                },
            }); 
        });
    
        it('Regular user can`t add a topic.', async () => {
            mocks.mockTopicService.findTopic = mocks.mockTopicService.returnNull;
    
            const mockCreateTopic = async (ctx) => {
                ctx.user = mocks.mockUsers.regularUser;
                ctx.render = (view, data) => mocks.mockRender(ctx, view, data);
                await topicController.createTopic(ctx, undefined, mocks.mockTopicService);
            };
    
            const app = mocks.getMockAppWithRouter("POST", "/topics", mockCreateTopic);
    
            const request = await superoak(app);
            const response = await request
            .post("/topics")
            .send(`name=${mocks.mockTopicService.randomTopic.name}`);
    
            assertEquals(response.status, 200);
            assertEquals(response.body.view, "./pages/topics/topics.eta");
            assertEquals(response.body.data, {
                name: mocks.mockTopicService.randomTopic.name,
                validationErrors: {
                    admin: {
                        haveNotPermisions: "you do not permission to do this action",
                    },
                },
            }); 
        });
    });
    
    describe('POST /topics/:id/delete - topicController.deleteTopic', async () => {
        it('Admin can delete a topic.', async () =>{
            const mockDeleteTopic = async (ctx) => {
                ctx.user = mocks.mockUsers.admin;
                await topicController.deleteTopic(ctx, undefined, mocks.mockTopicService);
            };
    
            const path = `/topics/${mocks.mockTopicService.randomTopic.id}/delete`;
            const app = mocks.getMockAppWithRouter("POST", path, mockDeleteTopic);
    
            const request = await superoak(app);
            const response = await request
            .post(path)
            .send(`name=${mocks.mockTopicService.randomTopic.name}`);
    
            assertEquals(response.status, 302);
            assertEquals(response.get("location"), "/topics");
        });
    
        it('Regular user can`t delete a topic.', async () =>{
            const mockDeleteTopic = async (ctx) => {
                ctx.user = mocks.mockUsers.regularUser;
                await topicController.deleteTopic(ctx, undefined, mocks.mockTopicService);
            };
    
            const path = `/topics/${mocks.mockTopicService.randomTopic.id}/delete`;
            const app = mocks.getMockAppWithRouter("POST", path, mockDeleteTopic);
    
            const request = await superoak(app);
            await request
            .post(path)
            .send(`name=${mocks.mockTopicService.randomTopic.name}`)
            .expect(200)
            .expect("You do not have permissions for this action.");
        });
    });
    
    it('GET /topics/:id - topicController.viewTopic', async () => {
        const mockViewTopic = async (ctx) => {
            ctx.render = (view, data) => mocks.mockRender(ctx, view, data);
            await topicController.viewTopic(ctx, undefined, mocks.mockTopicService, mocks.mockQuestionService);
        };
    
        const path = `/topics/${mocks.mockTopicService.randomTopic.id}`;
        const app = mocks.getMockAppWithRouter("GET", path, mockViewTopic);
        
        const request = await superoak(app);
        const response = await request.get(path);
        
        assertEquals(response.status, 200);
        assertEquals(response.body.view, "./pages/topics/topic.eta");
        assertEquals(response.body.data, {
            topic: mocks.mockTopicService.randomTopic,
            questions: mocks.mockQuestionService.randomQuestion,
        });
    });
    
    it('GET /topics/ - topicController.viewTopicsList', async () => {
        const mockViewTopicsList = async (ctx) => {
            ctx.render = (view, data) => mocks.mockRender(ctx, view, data);
            await topicController.viewTopicsList(ctx, undefined, mocks.mockTopicService);
        };
    
        const app = mocks.getMockAppWithRouter("GET", "/topics", mockViewTopicsList);
        
        const request = await superoak(app);
        const response = await request.get("/topics");
        
        assertEquals(response.status, 200);
        assertEquals(response.body.view, "./pages/topics/topics.eta");
        assertEquals(response.body.data, {
            topics: mocks.mockTopicService.randomTopic
        });
    });
});
