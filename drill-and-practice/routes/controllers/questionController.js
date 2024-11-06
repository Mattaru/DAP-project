import { executeQuery } from "../../database/database.js";
import * as questionOptionService from "../../services/questionOptionService.js";
import * as questionService from "../../services/questionService.js";
import * as dataValidUtils from "../../utils/dataValidUtils.js";
import * as requestUtils from "../../utils/requestUtils.js";


export const createQuestion = async ({ params, request, response, render, user }) => {
    const questionData = await requestUtils.getData(request, {type: "form"});
    const [passes, errors] = await dataValidUtils.questionValid(questionData);

    if (!passes) {
        questionData.validationErrors = errors;
        
        await render("./pages/topics/topic.eta", questionData);
    } else {
        await questionService.addQuestion(
            user.id,
            params.id,
            questionData.question_text,
        );

        response.redirect(`/topics/${params.id}`);
    }
};

export const deleteQuestion = async ({ params, response }) => {
    const options = await questionOptionService.findAllByQuestionId(params.qId);
    
    if (options.length === 0) await questionService.removeQuestionById(params.qId);

    response.redirect(`/topics/${params.id}`);
};

export const viewQuestion = async ({ params, render }) => {
    await render("./pages/questions/question.eta", {
        topic: {id: params.id},
        question: await questionService.findQuestionById(params.qId),
        options: await questionOptionService.findAllByQuestionId(params.qId),
    });
};
