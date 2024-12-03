import { Router } from "../deps.js";
import * as authApi from "./apis/authApi.js";
import * as questionApi from "./apis/questionApi.js";


export const apiRouter = new Router();

apiRouter
.get("/api/auth/dashboard", authApi.dashboard)
.post("/api/auth/login", authApi.login)
.post("/api/auth/logout", authApi.logOut)
.post("/api/auth/register", authApi.registration);

apiRouter
.get("/api/questions/random", questionApi.reciveRandomQuestion)
.post("/api/questions/answer", questionApi.checkAnswer);
