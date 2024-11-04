import * as questionOptionService from "../../services/questionOptionService.js";
import * as dataValidUtils from "../../utils/dataValidUtils.js";
import * as requestUtils from "../../utils/requestUtils.js";


export const addQuestionOption = async ({ params, request, response, render }) => {
    const qOptionsData = await requestUtils.getData(request, {type: "form"});
    const [passes, errors] = await dataValidUtils.questionOptionValid(qOptionsData);
    
    if (!passes) {
        qOptionsData.validationErrors = errors;
        await render("question.eta", qOptionsData);
    } else {
        const optionsObj = dataValidUtils.makeArreyWihOptionsData(qOptionsData);
        
        optionsObj.forEach(async (opt) => {
            let is_correct = false;
            
            if (opt.is_correct) is_correct = true;
            
            await questionOptionService.addQuestionOption(
                params.qId,
                opt.option_text,
                is_correct,
            );
        });

        response.redirect(`/topics/${params.id}/questions/${params.qId}`);
    }
};
