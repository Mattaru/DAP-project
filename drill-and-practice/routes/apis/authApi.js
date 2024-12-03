import { bcrypt } from "../../deps.js";
import * as userService from "../../services/userService.js";
import * as dataValidUtils from "../../utils/dataValidUtils.js";


export const dashboard = async ({ response, state }) => {
    const user = await state.session.get("user");

    if (!user) {
        response.status = 401;
        response.body = {message: "Unauthorized"};
    } else {
        response.body = {user: user};
    }
};

export const login = async ({ request, response, state }, next={}, service=userService) => {
    const body = request.body({type: "json"});
    const userData = await body.value;
    const userFromDb = await service.findUser(userData.email);
    
    const [passes, errors] = await dataValidUtils.userLoginValid(userData, userFromDb);

    if (passes) {
        await state.session.set("user", {email: userData.email});

        response.body = {message: "Login successful"};
    } else {
        response.status = 401;
        response.body = {errors};
    }
}; 

export const logOut = async ({ response, state }, next={}) => {
    await state.session.deleteSession();

    response.body = {message: "Logged out successfully"};
}; 

export const registration = async ({ request, response }, next={}, service=userService) => {
    const body = request.body({type: "json"});
    const newUserData = await body.value;
    const userFromDb = await service.findUser(newUserData.email);
    
    const [passes, errors] = await dataValidUtils.userRegisterValid(newUserData, userFromDb);
    
    if (passes) {
        await service.addUser(
            newUserData.email, 
            await bcrypt.hash(newUserData.password)
        );

        response.status = 201;
        response.body = {message: "User registered successfully"};
    }
    else {
        response.status = 401;
        response.body = {errors};
    }
}; 
