import nc from "next-connect";
import {
  mongodb,
  basicRateLimit,
  auth,
  authCompleted,
} from "@/middlewares/index";
import { findAllShippingMethods } from "@/mongodb/index";
import { calculateShippingMethods } from "@/lib/index";

const handler = nc();

handler.use(basicRateLimit).use(mongodb).use(auth).use(authCompleted);

handler.post(async (req, res) => {
  const { db, body } = req;

  const allShippingMethods = await findAllShippingMethods(db);
  const shippingMethods = calculateShippingMethods(body, allShippingMethods);
  res.status(200).json(shippingMethods);
});

export default handler;
