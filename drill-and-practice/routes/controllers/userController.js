import { bcrypt } from "../../deps.js";
import * as dataValidUtils from "../../utils/dataValidUtils.js";
import * as requestUtils from "../../utils/requestUtils.js";
import * as userService from "../../services/userService.js";


export const login = async ({ request, response, render, state }) => {
    const userData = await requestUtils.getData(request, {type: "form"});
    const [passes, errors, user] = await dataValidUtils.userLoginValid(userData);

    if (!passes) {
        userData.validationErrors = errors;

        await render("login.eta", userData);
    } else {
        await state.session.set("user", user);

        response.redirect("/topics");
    }
};

export const logout = async ({ response, state }) => {
    await state.session.deleteSession();

    response.redirect("/auth/login");
};

export const registration = async ({ request, response, render }) => {
    const userData = await requestUtils.getData(request, {type: "form"});
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

export const viewRegistration = async ({ render }) => {
    await render("register.eta");
};

export const viewLogin = async ({ render }) => {
    await render("login.eta");
};
