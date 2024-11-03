export const getData = async (request, contentType) => {
    const body = request.body(contentType);
    const params = await body.value;

    const formData = {};
    
    for (const [key, value] of params) {
        formData[key] = value;
    }

    return formData;
};
