import * as questionService from "../../services/questionService.js";
import * as topicService from "../../services/topicService.js";


export const showAllTopics = async ({ render }) => {
    await render ("./pages/quiz/quiz.eta", {topics: await topicService.findAll()});
};

export const getRandomQuestion = async ({ params, response }) => {
    const question = await questionService.getRandomQuestionByTopicId(params.tId);
    // test it
    console.log(question ? true : false);

    if(question) response.redirect(`/quiz/${params.tId}/questions/${question.id}`);
    else response.redirect("/quiz");
};

export const showRandomQuestion = async ({ params, render }) => {
    await render("./pages/quiz/rQuestion.eta", {
        question: await questionService.getRandomQuestionWithOptions(params.qId)
    });
};
