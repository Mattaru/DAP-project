import * as questionService from "../../services/questionService.js";
import * as topicService from "../../services/topicService.js";
import * as dataValidUtils from "../../utils/dataValidUtils.js";
import * as requestUtils from "../../utils/requestUtils.js";


export const createTopic = async ({ request, response, render, user }) => {
    const topicData = await requestUtils.getData(request, {type: "form"});
    const [passes, errors] = await dataValidUtils.topicValid(topicData, user.admin);
    
    if (!passes) {
        topicData.validationErrors = errors;
        
        await render("./pages/topics/topics.eta", topicData);
    } else {
        await topicService.addTopic(user.id, topicData.name);

        response.redirect("/topics");
    }
};

export const deleteTopic = async ({ params, response, user }) => {
    if (user.admin) {
        await topicService.removeTopic(params.id);
    } else {
        response.body = "You do not have permissions for this action."
    }

    response.redirect("/topics");
};

export const viewTopic = async ({ params, render }) => {
    await render("./pages/topics/topic.eta", {
        topic: await topicService.findTopicById(params.id),
        questions: await questionService.findAllQuestinsByTopicId(params.id),
    });
};

export const viewTopicsList = async ({ render }) => {
    await render("./pages/topics/topics.eta", {topics: await topicService.findAll()})
};
