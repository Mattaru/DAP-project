import * as questionOptionService from "../../services/questionOptionService.js";
import * as dataValidUtils from "../../utils/dataValidUtils.js";
import * as requestUtils from "../../utils/requestUtils.js";


export const addQuestionOption = async ({ params, request, response, render }) => {
    const qOptionsData = await requestUtils.getData(request, {type: "form"});
    const [passes, errors] = await dataValidUtils.questionOptionValid(qOptionsData);
    
    if (!passes) {
        qOptionsData.validationErrors = errors;
        await render("./pages/questions/question.eta", qOptionsData);
    } else {
        const optArr = dataValidUtils.makeArreyWihtOptionsData(qOptionsData);
        
        if (optArr.length > 10) response.body = "You can't add mothen 10 answer options in one time."

        await questionOptionService.addMultipleQuestionOptions(params.qId, optArr);

        response.redirect(`/topics/${params.id}/questions/${params.qId}`);
    }
};

export const deleteQuestionOption = async ({ params, response }) => {
    await questionOptionService.removeById(params.oId);

    response.redirect(`/topics/${params.id}/questions/${params.qId}`);
};
