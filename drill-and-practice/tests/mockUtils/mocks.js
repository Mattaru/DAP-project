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
    async set(key, value) {
      this[key] = value;
    },
    async get(key) {
      return this[key];
    },
    async deleteSession() {
      this.user = null;
    },
  };
