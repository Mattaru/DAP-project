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
  addAnswer() {
    return null;
  },
  getAnswersCount() {
    return this.randomAnswersCount;
  },
};

export const mockQuestionService = {
  randomQuestion: {
    id: Math.random(),
    user_id: Math.random(),
    topic_id: Math.random(),
    question_text: `Text ${Math.random()}`,
  },
  randomQuestionsCount: Math.random(),
  addQuestion() {
    return null;
  },
  getQuestionsCount() { 
    return this.randomQuestionsCount;
  },
  getQuestionWithOptionsById() {
    return {
      id: this.randomQuestion.id,
      topic_id: mockTopicService.randomTopic.id,
      question_text: this.randomQuestion.question_text,
      options: [
        { id: 1, option_text: "Opt 1", is_correct: false },
        { id: 2, option_text: "Opt 2", is_correct: false },
        { id: 3, option_text: "Opt 3", is_correct: true },
        { id: 4, option_text: "Opt 4", is_correct: false }
      ]
    };
  },
  getRandomQuestionByTopicId() {
    return this.randomQuestion;
  },
  findQuestionById() {
    return this.randomQuestion;
  },
  findAllQuestinsByTopicId() {
    return this.randomQuestion;
  },
  retunNull() {
    return null;
  },
  retunRandomQuestion() {
    return this.randomQuestion;
  },
};

export const mockQuestionOptionsService = {
  randomQOption: {
    id: Math.random(),
    question_id: Math.random(),
    option_text: `Option ${Math.random()}`,
    is_correct: false,
  },
  addMultipleQuestionOptions() {
    return null;
  },
  findAllByQuestionId() {
    return this.randomQOption;
  },
  removeById() {
    return null
  },
  returnNull() {
    return null;
  },
  returnRandomQOption() {
    return this.randomQOption;
  },
};

export const mockTopicService = {
  randomTopic: {
    id: Math.random(),
    user_id: Math.random(),
    name: `Topic ${Math.random()}`,
  },
  randomTopicsCount: Math.random(),
  addTopic(userId, topicName) {
    return {userId, topicName};
  },
  getTopicsCount() {
    return this.randomTopicsCount;
  },
  findAll() {
    return this.randomTopic;
  },
  findTopic() {
    return this.randomTopic;
  },
  findTopicById() {
    return this.randomTopic;
  },
  returnRandomTopic() {
    return this.randomTopic;
  },
  returnNull() {
    return null;
  },
  removeTopic() {
    return null;
  },
};

export const mockUsers = {
  admin: {
    id: Math.random(),
    email: `${Math.random()}@admin.com`,
    password: null,
    admin: true
  },
  regularUser: {
    id: Math.random(),
    email: `${Math.random()}@regular.com`,
    password: null,
    admin: false
  },
}; 

export const mockUserService = {
  randomPassword: `${Math.random()}`,
  randomUser: {
      id: Math.random(),
      email: `${Math.random()}@test.com`,
      password: null,
  },
  addUser(email, hashedPassword) {
    return { email, hashedPassword };
  },
  findUser() {
    return this.randomUser;
  },
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
