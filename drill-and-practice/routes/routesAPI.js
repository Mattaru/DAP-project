import { Router } from "../deps.js";
import * as questionApi from "./apis/questionApi.js";


export const apiRouter = new Router();

apiRouter
.get("/api/questions/random", questionApi.reciveRandomQuestion)
.post("/api/questions/answer", questionApi.checkAnswer);
