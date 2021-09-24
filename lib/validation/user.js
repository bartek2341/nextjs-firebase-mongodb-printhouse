import {
  maxStringLength,
  minPasswordLength,
  accountTypes,
  spacesRegex,
} from "@/data/index";
import { isEmptyString, isEmptyObj } from "@/lib/index";

export const companyValidation = (values, t) => {
  const errors = {};
  const { company, taxId, address } = values;

  if (!company || isEmptyString(company)) {
    errors.company = t("validation:fieldRequired");
  } else if (company.length > maxStringLength || !spacesRegex.test(company)) {
    errors.company = t("validation:invalidValue");
  }
  if (!taxId || isEmptyString(taxId)) {
    errors.taxId = t("validation:fieldRequired");
  } else if (taxId.length > maxStringLength || !spacesRegex.test(taxId)) {
    errors.taxId = t("validation:invalidValue");
  }
  if (!address || isEmptyString(address.street)) {
    if (!errors.address) {
      errors.address = {};
    }
    errors.address.street = t("validation:fieldRequired");
  } else if (
    !address ||
    address.street.length > maxStringLength ||
    !spacesRegex.test(address.street)
  ) {
    if (!errors.address) {
      errors.address = {};
    }
    errors.address.street = t("validation:invalidValue");
  }
  if (!address || isEmptyString(address.postalCode)) {
    if (!errors.address) {
      errors.address = {};
    }
    errors.address.postalCode = t("validation:fieldRequired");
  } else if (
    !address ||
    address.postalCode.length > maxStringLength ||
    !spacesRegex.test(address.postalCode)
  ) {
    if (!errors.address) {
      errors.address = {};
    }
    errors.address.postalCode = t("validation:invalidValue");
  }
  if (!address || isEmptyString(address.city)) {
    if (!errors.address) {
      errors.address = {};
    }
    errors.address.city = t("validation:fieldRequired");
  } else if (
    !address ||
    address.city.length > maxStringLength ||
    !spacesRegex.test(address.city)
  ) {
    if (!errors.address) {
      errors.address = {};
    }
    errors.address.city = t("validation:invalidValue");
  }
  if (!address || isEmptyString(address.country)) {
    if (!errors.address) {
      errors.address = {};
    }
    errors.address.country = t("validation:fieldRequired");
  } else if (
    !address ||
    address.country.length > maxStringLength ||
    !spacesRegex.test(address.country)
  ) {
    if (!errors.address) {
      errors.address = {};
    }
    errors.address.country = t("validation:invalidValue");
  }
  return errors;
};

export const personValidation = (values, t) => {
  const errors = {};
  const { name, vorname, address } = values;

  if (isEmptyString(name)) {
    errors.name = t("validation:fieldRequired");
  } else if (name.length > maxStringLength || !spacesRegex.test(name)) {
    errors.name = t("validation:invalidValue");
  }
  if (isEmptyString(vorname)) {
    errors.vorname = t("validation:fieldRequired");
  } else if (vorname.length > maxStringLength || !spacesRegex.test(vorname)) {
    errors.vorname = t("validation:invalidValue");
  }
  if (!address || isEmptyString(address.street)) {
    if (!errors.address) {
      errors.address = {};
    }
    errors.address.street = t("validation:fieldRequired");
  } else if (
    !address ||
    address.street.length > maxStringLength ||
    !spacesRegex.test(address.street)
  ) {
    if (!errors.address) {
      errors.address = {};
    }
    errors.address.street = t("validation:invalidValue");
  }
  if (!address || isEmptyString(address.postalCode)) {
    if (!errors.address) {
      errors.address = {};
    }
    errors.address.postalCode = t("validation:fieldRequired");
  } else if (
    !address ||
    address.postalCode.length > maxStringLength ||
    !spacesRegex.test(address.postalCode)
  ) {
    if (!errors.address) {
      errors.address = {};
    }
    errors.address.postalCode = t("validation:invalidValue");
  }
  if (!address || isEmptyString(address.city)) {
    if (!errors.address) {
      errors.address = {};
    }
    errors.address.city = t("validation:fieldRequired");
  } else if (
    !address ||
    address.city.length > maxStringLength ||
    !spacesRegex.test(address.city)
  ) {
    if (!errors.address) {
      errors.address = {};
    }
    errors.address.city = t("validation:invalidValue");
  }
  if (!address || isEmptyString(address.country)) {
    if (!errors.address) {
      errors.address = {};
    }
    errors.address.country = t("validation:fieldRequired");
  } else if (
    !address ||
    address.country.length > maxStringLength ||
    !spacesRegex.test(address.country)
  ) {
    if (!errors.address) {
      errors.address = {};
    }
    errors.address.country = t("validation:invalidValue");
  }
  return errors;
};

const userDataLengthValidation = (values) => {
  return (
    Object.keys(values).length === 2 &&
    Object.keys(values.data).length === 3 &&
    Object.keys(values.data.address).length === 4
  );
};

export const userDataValidation = (values) => {
  const { type, data } = values;
  return (
    (userDataLengthValidation(values) &&
      type === accountTypes.person &&
      isEmptyObj(personValidation(data))) ||
    (userDataLengthValidation(values) &&
      type === accountTypes.company &&
      isEmptyObj(companyValidation(data)))
  );
};

export const changePasswordValidation = (values, t) => {
  const { currentPassword, newPassword, confirmNewPassword } = values;
  const errors = {};
  if (!currentPassword) {
    errors.currentPassword = t("validation:fieldRequired");
  } else if (currentPassword.length < minPasswordLength) {
    errors.currentPassword = t("validation:weakPassword");
  }
  if (!newPassword) {
    errors.newPassword = t("validation:fieldRequired");
  } else if (newPassword.length < minPasswordLength) {
    errors.newPassword = t("validation:weakPassword");
  }
  if (!confirmNewPassword) {
    errors.confirmNewPassword = t("validation:fieldRequired");
  } else if (confirmNewPassword !== newPassword) {
    errors.confirmNewPassword = t("validation:passwordNotEqual");
  }
  return errors;
};

export const deleteAccountValidation = (values, t) => {
  const { password } = values;
  const errors = {};
  if (!password) {
    errors.password = t("validation:fieldRequired");
  } else if (password.length < minPasswordLength) {
    errors.password = t("validation:weakPassword");
  }
  return errors;
};
