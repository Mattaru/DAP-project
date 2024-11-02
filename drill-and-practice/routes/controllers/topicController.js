import * as questionService from "../../services/questionService.js";
import * as topicService from "../../services/topicService.js";
import * as dataValidUtils from "../../utils/dataValidUtils.js";
import * as requestUtils from "../../utils/requestUtils.js";


const createTopic = async ({ request, response, render, user }) => {
    const topicData = await requestUtils.getTopicData(request);
    const [passes, errors] = await dataValidUtils.topicValid(topicData, user.admin);
    
    if (!passes) {
        topicData.validationErrors = errors;
        
        await render("topics.eta", topicData);
    } else {
        await topicService.addTopic(user.id, topicData.name);

        response.redirect("/topics");
    }
};

const deleteTopic = async ({ params, response, user }) => {
    const topicId = params.id;
    const admin = user.admin;

    if (admin) {
        await questionService.removeQuestionsByTopicId(topicId);
        await topicService.removeTopic(topicId);
    } else {
        response.body = "You do not have permissions for this action."
    }

    response.redirect("/topics");
};

const viewTopic = async ({ params, render }) => {
    await render("topic.eta", {
        topic: await topicService.findTopicById(params.id),
        questions: await questionService.findAllByTopicId(params.id),
    });
};

const viewTopicsList = async ({ render }) => {
    await render("topics.eta", {topics: await topicService.findAll()})
};


export { createTopic, deleteTopic, viewTopic, viewTopicsList };
