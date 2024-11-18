import { bcrypt } from "../../deps.js";
import * as dataValidUtils from "../../utils/dataValidUtils.js";
import * as requestUtils from "../../utils/requestUtils.js";
import * as userService from "../../services/userService.js";


export const login = async ({ request, response, render, state }, next={}, service=userService) => {
    const userData = await requestUtils.getData(request, {type: "form"});
    const userFromDb = await service.findUser(userData.email);
    const [passes, errors, user] = await dataValidUtils.userLoginValid(userData, userFromDb);
    
    if (!passes) {
        userData.validationErrors = errors;

        await render("./pages/users/login.eta", userData);
    } else {
        await state.session.set("user", user);

        response.redirect("/topics");
    }
};

export const logout = async ({ response, state }) => {
    await state.session.deleteSession();

    response.redirect("/auth/login");
};

export const registration = async ({ request, response, render }, next={}, service=userService) => {
    const userData = await requestUtils.getData(request, {type: "form"});
    const userFromDb = await service.findUser(userData.email);
    const [passes, errors] = await dataValidUtils.userRegisterValid(userData, userFromDb);
    
    if (!passes) {
        userData.validationErrors = errors;
        await render("./pages/users/register.eta", userData);
    } else {
        await service.addUser(
            userData.email,
            await bcrypt.hash(userData.password),
        );

        response.redirect("/auth/login");
    }
};

export const viewRegistration = async ({ render }) => {
    await render("./pages/users/register.eta");
};

export const viewLogin = async ({ render }) => {
    await render("./pages/users/login.eta");
};
