import * as questionService from "../../services/questionService.js";
import * as apiUtils from "../../utils/apiUtils.js";


export const checkAnswer = async ({ request, response }, service=questionService) => {
    const body = request.body({type: "json"});
    const answer = await body.value;

    const passes = apiUtils.validAnswerObj(answer);

    if (passes){
        const question = await service.getQuestionWithOptionsById(answer.questionId);
        const answerIsRight = apiUtils.checkRightAnswers(answer.optionsIds, question.options);
    
        if (answerIsRight) response.body = {correct: true};
        else response.body = {correct: false};
    } else {
        response.status = 400;
    }
};

export const reciveRandomQuestion = async ({ response }, service=questionService) => {
    const rQuestion = await service.getRandomQuestion();
    
    if (rQuestion) {
        const rdyObj = apiUtils.qObjKeysToCamelCase(rQuestion);
    
        response.body = rdyObj;
    } else {
        response.body = {};
    }
};
