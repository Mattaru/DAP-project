import { Router } from "../deps.js";


const hello = ({ render }) => {
    render("main.eta");
};

const router = new Router();

router.get("/", hello);


export { router };