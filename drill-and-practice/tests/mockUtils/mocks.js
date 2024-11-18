import { Application, Router } from "../../deps.js";


export const getMockAppWithRouter = (method, path, func) => {
  const app = new Application();
  const router = new Router();

  if (method === "GET") router.get(path, func);
  else if (method === "POST") router.post(path, func);
  else if (method === "DELETE") router.delete(path, func);
  else if (method === "UPDATE") router.update(path, func);

  app.use(router.routes());
  app.use(router.allowedMethods());

  return app;
};

export const mockAnswerService = {
    randomAnswersCount: Math.random(),
    getAnswersCount: () => mockAnswerService.randomAnswersCount,
};

export const mockQuestionService = {
    randomQuestionsCount: Math.random(),
    getQuestionsCount: () => mockQuestionService.randomQuestionsCount,
};

export const mockTopicService = {
    randomTopicsCount: Math.random(),
    getTopicsCount: () => mockTopicService.randomTopicsCount,
};

export const mockUserService = {
    randomPassword: `${Math.random()}`,
    randomUser: {
        id: Math.random(),
        email: `${Math.random()}@test.com`,
        password: null,
    },
    addUser: async (email, hashedPassword) => ({ email, hashedPassword }),
    findUser: (email) => (mockUserService.randomUser),
};

export const mockRender = (ctx, view, data) => {
    ctx.response.body = { view, data };
};

export const mockSession = {
  set(key, value) {
    this[key] = value;
  },
  get(key) {
    return this[key];
  },
  deleteSession() {
    this.user = null;
  },
};
