import * as answerService from "../../services/answerService.js";
import * as questionService from "../../services/questionService.js";
import * as topicService from "../../services/topicService.js";
import * as dataValidUtils from "../../utils/dataValidUtils.js";
import * as requestUtils from "../../utils/requestUtils.js";


export const checkOptions = async ({ params, request, render, user }, next={}, aService=answerService, qService=questionService) => {
    const answerData = await requestUtils.getData(request);
    const question = await qService.getQuestionWithOptionsById(params.qId);
    
    const [answerIsRight, answersIds] = dataValidUtils.checkRightAnswers(answerData, question.options);
    // Make answer data valid
    await aService.addAnswer(user.id, question.id, answersIds);

    if (answerIsRight) 
        await render("/pages/quiz/results.eta", { 
            correct: true,
            topic_id: question.topic_id,
        });
    else 
        await render("/pages/quiz/results.eta", { 
            question: question 
        });
};

export const getRandomQuestion = async ({ params, response, render }, next={}, service=questionService) => {
    const question = await service.getRandomQuestionByTopicId(params.tId);

    if(question) response.redirect(`/quiz/${params.tId}/questions/${question.id}`);
    else await render("./pages/quiz/results.eta", {questionNotExist: true});
};

export const viewAllTopics = async ({ render }, next={}, service=topicService) => {
    await render ("./pages/quiz/quiz.eta", {topics: await service.findAll()});
};

export const viewRandomQuestion = async ({ params, render }, next={}, service=questionService) => {
    await render("./pages/quiz/rQuestion.eta", {
        question: await service.getQuestionWithOptionsById(params.qId)
    });
};
