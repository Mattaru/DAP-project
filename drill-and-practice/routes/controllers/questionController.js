import * as questionService from "../../services/questionService.js";
import * as dataValidUtils from "../../utils/dataValidUtils.js";
import * as requestUtils from "../../utils/requestUtils.js";


const createQuestion = async ({ params, request, response, render, user }) => {
    const questionData = await requestUtils.getQuestionData(request);
    const [passes, errors] = await dataValidUtils.questionValid(questionData);

    if (!passes) {
        questionData.validationErrors = errors;
        console.log(questionData);
        await render("topic.eta", questionData);
    } else {
        await questionService.addQuestion(
            user.id,
            params.id,
            questionData.question_text,
        );

        response.redirect(`/topics/${params.id}`);
    }
};


export { createQuestion };
