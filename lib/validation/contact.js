import { maxStringLength, spacesRegex } from "@/data/index";
import { isEmptyString } from "@/lib/index";

export const contactValidation = (values, t) => {
  const { subject, message } = values;
  const errors = {};
  if (!subject || isEmptyString(subject)) {
    errors.subject = t("validation:fieldRequired");
  } else if (subject.length > maxStringLength || !spacesRegex.test(subject)) {
    errors.subject = t("validation:invalidValue");
  }
  if (!message || isEmptyString(message)) {
    errors.message = t("validation:fieldRequired");
  } else if (message.length > maxStringLength || !spacesRegex.test(message)) {
    errors.message = t("validation:invalidValue");
  }
  return errors;
};
