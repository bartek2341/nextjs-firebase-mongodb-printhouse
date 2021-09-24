import { MongoClient } from "mongodb";
import { mongoConfig } from "@/mongodb/connect";

export default async function mongodb(req, res, next) {
  global.mongo = global.mongo || {};
  if (!global.mongo.client) {
    global.mongo.client = new MongoClient(process.env.MONGODB_URI, mongoConfig);
    await global.mongo.client.connect();
  }
  req.db = global.mongo.client.db(process.env.MONGODB_NAME);
  return next();
}
