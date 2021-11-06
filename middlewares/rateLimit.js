import { rateLimit } from "@/lib/index";

const basicLimiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

const orderLimiter = rateLimit({
  interval: 60 * 1000 * 5, // 15 minutes
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

export async function basicRateLimit(req, res, next) {
  try {
    await basicLimiter.check(res, 60, "CACHE_TOKEN"); // 60 requests per minute
    next();
  } catch {
    res.status(429).end();
  }
}

export async function createOrderLimit(req, res, next) {
  try {
    await orderLimiter.check(res, 10, "CACHE_TOKEN"); // 10 requests per 5 minutes
    next();
  } catch {
    res.status(429).end();
  }
}
