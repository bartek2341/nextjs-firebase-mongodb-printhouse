import rateLimit from "express-rate-limit";

export const createOrderLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 100 requests per windowMs
});

export const basicRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 40, // limit each IP to 100 requests per windowMs
});
