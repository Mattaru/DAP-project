import * as questionOptionService from "../../services/questionOptionService.js";
import * as dataValidUtils from "../../utils/dataValidUtils.js";
import * as requestUtils from "../../utils/requestUtils.js";


export const addQuestionOption = async ({ params, request, response, render }) => {
    const qOptionsData = await requestUtils.getData(request, {type: "form"});
    const [passes, errors] = await dataValidUtils.questionOptionValid(qOptionsData);
    console.log(qOptionsData);
    if (!passes) {
        qOptionsData.validationErrors = errors;
        await render("question.eta", qOptionsData);
    } else {

        response.redirect(`/topics/${params.id}/questions/${params.qId}`);
    }
};
