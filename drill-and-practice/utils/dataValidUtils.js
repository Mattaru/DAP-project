import { bcrypt, validasaur } from "../deps.js";
import * as userService from "../services/userService.js";


const userLoginValidationRules = {
  email: [validasaur.required, validasaur.isEmail],
  password: [validasaur.required, validasaur.minLength(4)],
};

const userLoginValid = async (userData) => {
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

  console.log(passes, errors, user);

  return [passes, errors, user];
};

const userRegisterValidationRules = {
  email: [validasaur.required, validasaur.isEmail],
  password: [validasaur.required, validasaur.minLength(4)],
  verification: [validasaur.required, validasaur.minLength(4)],
};

const userRegisterValid = async (userData) => {
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


export { userLoginValid, userRegisterValid };