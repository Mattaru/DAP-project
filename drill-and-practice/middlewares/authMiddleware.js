import * as config from "../config/config.js";


export const authMiddleware = async ({ request, response, state }, next) => {
    const user = state.session.get("user");

    if(!user && config.restrictedPaths.some((path) => 
        request.url.pathname.startsWith(path)
    )) response.redirect("/auth/login");
    else {
        await next();
    } 
};
