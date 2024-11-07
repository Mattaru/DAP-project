export const checkRightAnswers = (answersIds, qestionOptions) => {
    let passes = false;
  
    const rightOptionsIds = [];
  
    qestionOptions.forEach((option) => {
        if (option.is_correct) rightOptionsIds.push(option.id);
    });
  
    const allAnswersRight = answersIds.every(element => rightOptionsIds.includes(element));
  
    if (allAnswersRight && answersIds.length === rightOptionsIds.length) passes = true;
  
    return passes;
};

const isArrayOfInts = (arr) => {
    return Array.isArray(arr) && arr.every(item => Number.isInteger(item));
};

export function qObjKeysToCamelCase(obj) {
    const newObj = {};

    for (const key in obj) {
        let camelCaseKey;

        if (key === "questionid") camelCaseKey = "questionId";
        if (key === "questiontext") camelCaseKey = "questionText";
        if (key === "answeroptions") camelCaseKey = "answerOptions";

        newObj[camelCaseKey] = obj[key];
    }
    return newObj;
}

export const validAnswerObj = (answer) => {
    if (!answer) return false;

    const idIsInt = Number.isInteger(answer.questionId);
    const arrOfInts = isArrayOfInts(answer.optionsIds);

    if (!idIsInt || !arrOfInts) return false;

    return true;
};
