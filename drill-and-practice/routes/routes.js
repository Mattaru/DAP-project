import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as questionController from "./controllers/questionController.js";
import * as questOptionsController from "./controllers/questionOptionController.js";
import * as quizController from "./controllers/quizController.js";
import * as topicController from "./controllers/topicController.js";
import * as userController from "./controllers/userController.js";


export const router = new Router();

router.get("/", mainController.viewMain);

router.get("/auth/login", userController.viewLogin)
.post("/auth/login", userController.login)
.get("/auth/logout", userController.logout)
.get("/auth/register", userController.viewRegistration)
.post("/auth/register", userController.registration);

router.get("/topics", topicController.viewTopicsList)
.post("/topics", topicController.createTopic)
.get("/topics/:id", topicController.viewTopic)
.post("/topics/:id/delete", topicController.deleteTopic);

router.post("/topics/:id/questions", questionController.createQuestion)
.get("/topics/:id/questions/:qId", questionController.viewQuestion)
.post("/topics/:id/questions/:qId/delete", questionController.deleteQuestion);

router.post("/topics/:id/questions/:qId/options", questOptionsController.addQuestionOption)
.post("/topics/:id/questions/:qId/options/:oId/delete", questOptionsController.deleteQuestionOption);

router.get("/quiz", quizController.viewAllTopics)
.get("/quiz/:tId", quizController.getRandomQuestion)
.get("/quiz/:tId/questions/:qId", quizController.viewRandomQuestion)
.post("/quiz/:tId/questions/:qId/options", quizController.checkOptions);
