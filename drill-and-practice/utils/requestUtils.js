const getUserData = async (request) => {
    const body = request.body({type: "form"});
    const params = await body.value;

    const data = {};

    if (params.get("email")) data.email = params.get("email");
    if (params.get("password")) data.password = params.get("password");
    if (params.get("verification")) data.password = params.get("verification");

    return data;
};


export { getUserData };
