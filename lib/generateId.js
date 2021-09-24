import { orderIdLength } from "@/data/index";

export const generateId = () => {
  return Math.random().toString(36).substr(2, 12);
};

export const generateOrderId = () => {
  let results = "";
  for (let i = 0; i < orderIdLength; i++) {
    results += Math.floor(Math.random() * 10);
  }
  return results;
};
