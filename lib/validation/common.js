import { maxStringLength, spacesRegex } from "@/data/index";
import { isEmptyString } from "@/lib/index";

export const required = (value, t) =>
  value ? undefined : t("validation:fieldRequired");

export const requiredValue = (value, t) =>
  isEmptyString(value)
    ? t("validation:fieldRequired")
    : value.length > maxStringLength || !spacesRegex.test(value)
    ? t("validation:invalidValue")
    : undefined;
