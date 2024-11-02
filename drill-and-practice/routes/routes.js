import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicController from "./controllers/topicController.js";
import * as userController from "./controllers/userController.js";


const router = new Router();

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


export { router };
