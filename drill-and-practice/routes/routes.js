import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as userController from "./controllers/userController.js";


const router = new Router();

router.get("/", mainController.viewMain);

router.get("/auth/login", userController.viewLogin)
.post("/auth/login", userController.login)
.get("/auth/logout", userController.logout)
.get("/auth/register", userController.viewRegistration)
.post("/auth/register", userController.registration);


export { router };