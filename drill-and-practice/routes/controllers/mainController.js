import * as answerService from "../../services/answerService.js";
import * as questionService from "../../services/questionService.js";
import * as topicService from "../../services/topicService.js";


export const viewMain = async ({ render },
    something={},
    aService=answerService,
    qService=questionService,
    tService=topicService
) => {
    render("main.eta", {
        answersCount: await aService.getAnswersCount(),
        questionsCount: await qService.getQuestionsCount(),
        topicsCount: await tService.getTopicsCount(),
    });
};