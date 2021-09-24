import { MongoClient } from "mongodb";

export const mongoConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectMongodb = async () => {
  global.mongo = global.mongo || {};
  if (!global.mongo.client) {
    global.mongo.client = new MongoClient(process.env.MONGODB_URI, mongoConfig);
    await global.mongo.client.connect();
  }
  const db = global.mongo.client.db(process.env.MONGODB_NAME);
  return db;
};

export default connectMongodb;
