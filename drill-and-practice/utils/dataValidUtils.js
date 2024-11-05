import { bcrypt, validasaur } from "../deps.js";
import * as topicService from "../services/topicService.js";
import * as userService from "../services/userService.js";


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

const qOPtionValidationRules = (qOptionsData) => {
  const rules = Object.keys(qOptionsData).reduce((acc, key) => {
    if (key.startsWith("option_text")) {
      acc[key] = [validasaur.required, validasaur.minLength(1)];
    }
    return acc;
  }, {});

  return rules;
};

export const questionOptionValid = async (qOptionsData) => {
  const questionValidationRules = qOPtionValidationRules(qOptionsData);
  
  const [passes, errors] = await validasaur.validate(
    qOptionsData,
    questionValidationRules
  );

  return [passes, errors];
};

const topicValidationRules = {
  name: [validasaur.required, validasaur.minLength(1)],
};

export const topicValid = async (topicData, admin) => {
  let [passes, errors] = await validasaur.validate(
    topicData,
    topicValidationRules,
  );
  
  if (!admin) {
      errors.admin = {haveNotPermisions: "you do not permission to do this action"};
      passes = false;
  } else if (passes && admin) {
    const topic = await topicService.findTopic(topicData.name);

    if (topic) {
      errors.name = {nameAlreadyExist: "a topic with the same name is already exists"};
      passes = false;
    }
  }

  return [passes, errors];
};

const userLoginValidationRules = {
  email: [validasaur.required, validasaur.isEmail],
  password: [validasaur.required, validasaur.minLength(4)],
};

export const userLoginValid = async (userData) => {
  let user;
  let [passes, errors] = await validasaur.validate(
    userData,
    userLoginValidationRules,
  );

  if (passes) {
    user = await userService.findUser(userData.email);
    
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

export const userRegisterValid = async (userData) => {
  let [passes, errors] = await validasaur.validate(
    userData,
    userRegisterValidationRules,
  );

  if (userData.password !== userData.verification) 
    errors.verification = {notEqual: "the value does not match the password"};

  if (passes) {
    const user = await userService.findUser(userData.email);
    
    if (user) {
      errors.email = {alreadyExists: "this email already exists"};
      passes = false;
    } 
  }

  return [passes, errors];
};
