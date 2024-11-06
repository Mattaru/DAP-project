import * as answerService from "../../services/answerService.js";
import * as questionService from "../../services/questionService.js";
import * as topicService from "../../services/topicService.js";


export const viewMain = async ({ render }) => {
    render("main.eta", {
        answersCount: await answerService.getAnswersCount(),
        questionsCount: await questionService.getQuestionsCount(),
        topicsCount: await topicService.getTopicsCount(),
    });
};
