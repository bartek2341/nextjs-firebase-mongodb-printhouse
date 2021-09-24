import { minPasswordLength, emailRegex } from "@/data/index";

export const loginValidation = (values, t) => {
  const { email, password } = values;
  const errors = {};
  if (!email) {
    errors.email = t("validation:fieldRequired");
  } else if (!emailRegex.test(email)) {
    errors.email = t("validation:invalidEmail");
  }
  if (!password) {
    errors.password = t("validation:fieldRequired");
  } else if (password.length < minPasswordLength) {
    errors.password = t("validation:weakPassword");
  }
  return errors;
};

export const signupValidation = (values, t) => {
  const { email, password, confirmPassword } = values;
  const errors = {};
  if (!email) {
    errors.email = t("validation:fieldRequired");
  } else if (!emailRegex.test(email)) {
    errors.email = t("validation:invalidEmail");
  }
  if (!password) {
    errors.password = t("validation:fieldRequired");
  } else if (password.length < minPasswordLength) {
    errors.password = t("validation:weakPassword");
  }
  if (!confirmPassword) {
    errors.confirmPassword = t("validation:fieldRequired");
  } else if (password !== confirmPassword) {
    errors.confirmPassword = t("validation:passwordNotEqual");
  }
  return errors;
};

export const resetPasswordValidation = (values, t) => {
  const { email } = values;
  const errors = {};
  if (!email) {
    errors.email = t("validation:fieldRequired");
  } else if (!emailRegex.test(email)) {
    errors.email = t("validation:invalidEmail");
  }
  return errors;
};

export const handleAuthErrors = (err, t) => {
  switch (err.code) {
    case "auth/argument-error":
      return t("validation:fillAllFields");
    case "auth/invalid-email":
      return t("validation:invalidEmail");
    case "auth/email-already-in-use":
      return t("validation:emailAlreadyInUse");
    case "auth/weak-password":
      return t("validation:weakPassword");
    case "auth/user-not-found":
      return t("validation:userNotFound");
    case "auth/wrong-password":
      return t("validation:invalidPassword");
    case "auth/too-many-requests":
      return t("validation:tooManyRequests");

    default:
      return err.message;
  }
};
