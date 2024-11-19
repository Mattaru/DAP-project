import { bcrypt, validasaur } from "../deps.js";


export const checkRightAnswers = (answerData, qestionOptions) => {
  let passes = false;

  const answersIds = Object.keys(answerData).reduce((acc, key) => {
    acc.push(Number(key));
    return acc;
  }, []);

  const rightOptionsIds = [];

  qestionOptions.forEach((option) => {
    if (option.is_correct) rightOptionsIds.push(option.id);
  });

  const allAnswersRight = answersIds.every(element => rightOptionsIds.includes(element));

  if (allAnswersRight && answersIds.length === rightOptionsIds.length) passes = true;

  return [passes, answersIds];
};

const questionValidationRules = {
  question_text: [validasaur.required, validasaur.minLength(1)],
};

export const questionValid = async (questionData) => {
  const [passes, errors] = await validasaur.validate(
    questionData,
    questionValidationRules
  );

  return [passes, errors];
};

export const makeArreyWihtOptionsData = (qOptionsData) => {
  const arr = [];
  let index = 0;

  Object.keys(qOptionsData).forEach((key) => {
    if (key.startsWith("option_text")) {
      arr[index] = {};
      arr[index]['option_text'] = qOptionsData[key];
      index++;
    } else {
      arr[index - 1]["is_correct"] = qOptionsData[key];
    }
  });
  
  return arr;
};

const questionOptionValidationRules = {
  option_text: [validasaur.required, validasaur.minLength(1)],
}

export const questionOptionValid = async (qOptionsData) => {
  const optArr = makeArreyWihtOptionsData(qOptionsData);
  let passes = true; 
  let errors;
  
  if (optArr.length > 10) {
    passes = false;
    errors.options = {soManyOptions: "You can't add more then 10 answer options in one time."};
    return [passes, errors, optArr];
  }

  for (const opt of optArr) {
    [passes, errors] = await validasaur.validate(
      opt,
      questionOptionValidationRules
    );

    if (!passes) return [passes, errors, optArr];
  }

  return [passes, errors, optArr];
};

const topicValidationRules = {
  name: [validasaur.required, validasaur.minLength(1)],
};

export const topicValid = async (topicData, topic, admin) => {
  let [passes, errors] = await validasaur.validate(
    topicData,
    topicValidationRules,
  );
  
  if (!admin) {
      errors.admin = {haveNotPermisions: "you do not permission to do this action"};
      passes = false;
  }

  if (topic) {
      errors.name = {nameAlreadyExist: "a topic with the same name is already exists"};
      passes = false;
  }

  return [passes, errors];
};

const userLoginValidationRules = {
  email: [validasaur.required, validasaur.isEmail],
  password: [validasaur.required, validasaur.minLength(4)],
};

export const userLoginValid = async (userData, user) => {
  let [passes, errors] = await validasaur.validate(
    userData,
    userLoginValidationRules,
  );

  if (passes) {
    if (!user) {
      errors.email = {userNotExist: "user with this email address does not exist"}
      passes = false;
    } else {
      const passMatches = await bcrypt.compare(
        userData.password,
        user.password
      );

      if (!passMatches) {
        errors.password = {notValidPassword: "password is not valid"}
        passes = false;
      }
    }
  }

  return [passes, errors, user];
};

const userRegisterValidationRules = {
  email: [validasaur.required, validasaur.isEmail],
  password: [validasaur.required, validasaur.minLength(4)],
  verification: [validasaur.required, validasaur.minLength(4)],
};

export const userRegisterValid = async (userData, user) => {
  let [passes, errors] = await validasaur.validate(
    userData,
    userRegisterValidationRules,
  );

  if (userData.password !== userData.verification) {
    errors.verification = {notEqual: "the value does not match the password"};
    passes = false;
  }
  
  if (user) {
    errors.email = {alreadyExists: "this email already exists"};
    passes = false;
  } 

  return [passes, errors];
};
