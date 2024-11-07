import * as questionService from "../../services/questionService.js";
import * as apiUtils from "../../utils/apiUtils.js";


export const checkAnswer = async ({ request, response }) => {
    const body = request.body({type: "json"});
    const answer = await body.value;

    const passes = apiUtils.validAnswerObj(answer);
    
    if (passes){
        const question = await questionService.getQuestionWithOptionsById(answer.questionId);
        const answerIsRight = apiUtils.checkRightAnswers(answer.optionsIds, question.options);
        
        if (answerIsRight) response.body = {correct: true};
        else response.body = {correct: false};
    } else {
        response.status = 400;
    }
};

export const reciveRandomQuestion = async ({ response }) => {
    const rQuestion = await questionService.getRandomQuestion();

    if (!rQuestion) {
        const rdyObj = apiUtils.qObjKeysToCamelCase(rQuestion);
    
        response.body = rdyObj;
    } else {
        response.body = {};
    }
};
