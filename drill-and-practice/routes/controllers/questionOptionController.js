import * as questionService from "../../services/questionService.js";
import * as questionOptionService from "../../services/questionOptionService.js";
import * as dataValidUtils from "../../utils/dataValidUtils.js";
import * as requestUtils from "../../utils/requestUtils.js";


export const addQuestionOption = async ({ params, request, response, render }, next={}, qService=questionService, qOptService=questionOptionService) => {
    const qOptionsData = await requestUtils.getData(request, {type: "form"});
    const [passes, errors, options] = await dataValidUtils.questionOptionValid(qOptionsData);
    
    if (!passes) {
        qOptionsData.validationErrors = errors;
        qOptionsData.errOptions = options;
        qOptionsData.topic = {id: params.id};
        qOptionsData.question = await qService.findQuestionById(params.qId);

        await render("./pages/questions/question.eta", qOptionsData);
    } else {
        await qOptService.addMultipleQuestionOptions(params.qId, options);

        response.redirect(`/topics/${params.id}/questions/${params.qId}`);
    }
};

export const deleteQuestionOption = async ({ params, response }, next={}, service=questionOptionService) => {
    await service.removeById(params.oId);

    response.redirect(`/topics/${params.id}/questions/${params.qId}`);
};
