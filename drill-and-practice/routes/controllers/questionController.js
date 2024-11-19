import * as questionOptionService from "../../services/questionOptionService.js";
import * as questionService from "../../services/questionService.js";
import * as topicService from "../../services/topicService.js";
import * as dataValidUtils from "../../utils/dataValidUtils.js";
import * as requestUtils from "../../utils/requestUtils.js";


export const createQuestion = async ({ params, request, response, render, user }, next={}, qService=questionService, tService=topicService) => {
    const questionData = await requestUtils.getData(request, {type: "form"});
    const [passes, errors] = await dataValidUtils.questionValid(questionData);
 
    if (!passes) {
        questionData.validationErrors = errors;
        questionData.topic = await tService.findTopicById(params.id);
        
        await render("./pages/topics/topic.eta", questionData);
    } else {
        await qService.addQuestion(
            user.id,
            params.id,
            questionData.question_text,
        );

        response.redirect(`/topics/${params.id}`);
    }
};

export const deleteQuestion = async ({ params, response }, next={}, qService=questionService, qOptService=questionOptionService) => {
    const options = await qOptService.findAllByQuestionId(params.qId);
    
    if (options.length === 0) await qService.removeQuestionById(params.qId);

    response.redirect(`/topics/${params.id}`);
};

export const viewQuestion = async ({ params, render }, next={}, qService=questionService, qOptService=questionOptionService) => {
    await render("./pages/questions/question.eta", {
        topic: {id: params.id},
        question: await qService.findQuestionById(params.qId),
        options: await qOptService.findAllByQuestionId(params.qId),
    });
};
