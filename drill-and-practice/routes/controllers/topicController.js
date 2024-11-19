import * as questionService from "../../services/questionService.js";
import * as topicService from "../../services/topicService.js";
import * as dataValidUtils from "../../utils/dataValidUtils.js";
import * as requestUtils from "../../utils/requestUtils.js";


export const createTopic = async ({ request, response, render, user }, next={}, service=topicService) => {
    const topicData = await requestUtils.getData(request, {type: "form"});
    const topicFromDb = await service.findTopic(topicData.name);
    const [passes, errors] = await dataValidUtils.topicValid(topicData, topicFromDb, user.admin);
    
    if (!passes) {
        topicData.validationErrors = errors;
        
        await render("./pages/topics/topics.eta", topicData);
    } else {
        await service.addTopic(user.id, topicData.name);

        response.redirect("/topics");
    }
};

export const deleteTopic = async ({ params, response, user }, next={}, service=topicService) => {
    if (user.admin) {
        await service.removeTopic(params.id);

        response.redirect("/topics");
    } else {
        response.body = "You do not have permissions for this action.";
    }
};

export const viewTopic = async ({ params, render }, next={}, tService=topicService, qService=questionService) => {
    await render("./pages/topics/topic.eta", {
        topic: await tService.findTopicById(params.id),
        questions: await qService.findAllQuestinsByTopicId(params.id),
    });
};

export const viewTopicsList = async ({ render }, next={}, service=topicService) => {
    await render("./pages/topics/topics.eta", {topics: await service.findAll()})
};
