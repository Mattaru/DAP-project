// import * as userService from "../../services/userService.js";


const viewRegistration = async ({ render }) => {
    await render("registration.eta");
};

const viewLogin = async ({ render }) => {
    await render("login.eta");
};



export { viewRegistration, viewLogin }