import * as questionOptionService from "../../services/questionOptionService.js";
import * as requestUtils from "../../utils/requestUtils.js";


export const addQuestionOption = async ({ params, request, response }) => {
    const qOptionsData = await requestUtils.getData(request, {type: "form"});
    
    response.redirect(`/topics/${params.id}/questions/${params.qId}`);
};
