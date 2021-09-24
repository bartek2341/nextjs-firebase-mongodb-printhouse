import { accountTypes } from "@/data/index";
import { toTitleCase } from "@/lib/index";

export const isPerson = (user) => user.type === accountTypes.person;

export const normalizeUserData = (data) => {
  Object.entries(data).forEach(([key, value]) => {
    if (typeof value === "object") {
      Object.entries(value).forEach(([subkey, subval]) => {
        data[key][subkey] = toTitleCase(subval.trim());
      });
    } else {
      data[key] = toTitleCase(value.trim());
    }
  });
};
