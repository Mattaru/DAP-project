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

export const mockRender = (ctx, view, data) => {
    ctx.response.body = { view, data };
};
