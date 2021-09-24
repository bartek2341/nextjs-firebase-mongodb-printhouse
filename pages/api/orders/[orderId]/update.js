import nc from "next-connect";
import {
  mongodb,
  auth,
  authCompleted,
  setOrder,
  updateOrder,
  basicRateLimit,
} from "@/middlewares/index";
import { updateOrderById } from "@/mongodb/index";
import { orderStatusValidation } from "@/lib/index";

const handler = nc();
handler
  .use(basicRateLimit)
  .use(mongodb)
  .use(auth)
  .use(authCompleted)
  .use(setOrder)
  .use(updateOrder);

handler.put(async (req, res) => {
  const { db, body } = req;
  const isOrderStatusValid = orderStatusValidation(body.status);
  if (!isOrderStatusValid) return res.status(400).end();
  const order = await updateOrderById(req.order._id, db, body);
  res.status(200).json(order);
});

export default handler;
