import { bcrypt } from "../../deps.js";
import * as dataValidUtils from "../../utils/dataValidUtils.js";
import * as requestUtils from "../../utils/requestUtils.js";
import * as userService from "../../services/userService.js";


const login = async ({ request, response, render, state }) => {
    const userData = await requestUtils.getUserData(request);
    const [passes, errors, user] = await dataValidUtils.userLoginValid(userData);

    if (!passes) {
        userData.validationErrors = errors;

        await render("login.eta", userData);
    } else {
        await state.session.set("user", user);

        response.redirect("/topics");
    }
};

const logout = async ({ response, state }) => {
    await state.session.deleteSession();

    response.redirect("/auth/login");
};

const registration = async ({ request, response, render }) => {
    const userData = await requestUtils.getUserData(request);
    const [passes, errors] = await dataValidUtils.userRegisterValid(userData);

    if (!passes) {
        userData.validationErrors = errors;
        await render("register.eta", userData);
    } else {
        await userService.addUser(
            userData.email,
            await bcrypt.hash(userData.password),
        );

        response.redirect("/auth/login");
    }
};

const viewRegistration = async ({ render }) => {
    await render("register.eta");
};

const viewLogin = async ({ render }) => {
    await render("login.eta");
};


export { login, logout, registration, viewRegistration, viewLogin }
