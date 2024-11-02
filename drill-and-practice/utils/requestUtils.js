const requestParams = async (request, contentType) => {
    const body = request.body(contentType);
    const params = await body.value;

    return params;
};

const getTopicData = async (request) => {
    const params = await requestParams(
        request, 
        {type: "form"}
    );

    const data = {};

    if (params.get("name")) 
        data.name = params.get("name");

    return data;
};

const getUserData = async (request) => {
    const params = await requestParams(
        request, 
        {type: "form"}
    );
    
    const data = {};

    if (params.get("email")) 
        data.email = params.get("email");
    if (params.get("password")) 
        data.password = params.get("password");
    if (params.get("verification")) 
        data.verification = params.get("verification");
    
    return data;
};


export { getTopicData, getUserData };
