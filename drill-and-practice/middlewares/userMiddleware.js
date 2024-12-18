import * as userService from "../services/userService.js";


export const userMiddleware = async (ctx, next) => {
    const user = ctx.state.session.get("user");

    if (user) {
        const userFromDB = await userService.findUser(user.email);
        ctx.user = userFromDB;
    } 

    await next();
};
