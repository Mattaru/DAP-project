const requestParams = async (request, contentType) => {
    const body = request.body(contentType);
    const params = await body.value;

    return params;
};

const getQuestionData = async (request) => {
    const params = await requestParams(
        request, 
        {type: "form"}
    );

    return {
        question_text: params.get("question_text"),
    }
}

const getTopicData = async (request) => {
    const params = await requestParams(
        request, 
        {type: "form"}
    );

    return {
        name: params.get("name")
    };
};

const getUserData = async (request) => {
    const params = await requestParams(
        request, 
        {type: "form"}
    );
    
    return {
        email: params.get("email"),
        password: params.get("password"),
        verification: params.get("verification"),
    };
};


export { getQuestionData, getTopicData, getUserData };
