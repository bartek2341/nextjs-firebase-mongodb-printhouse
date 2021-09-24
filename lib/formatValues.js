import { dateFormat } from "@/data/index";

export const formatPrice = (number) => {
  return Number(number.toFixed(2));
};

export const formatDate = (string) => {
  const date = new Date(string);
  return new Intl.DateTimeFormat(dateFormat, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(date);
};

export const formatCurrency = (value, currency, locale) => {
  const number = Number(value);
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(number);
};
