import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as userController from "./controllers/userController.js";


const router = new Router();

router.get("/", mainController.viewMain);

router.get("/auth/login", userController.viewLogin)
.get("/auth/register", userController.viewRegistration);


export { router };