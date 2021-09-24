import nc from "next-connect";
import { mongodb, auth, basicRateLimit } from "@/middlewares/index";
import { findAllOrders } from "@/mongodb/index";
import { scopeOrders } from "@/lib/index";

const handler = nc();
handler.use(basicRateLimit).use(mongodb).use(auth);

handler.get(async (req, res) => {
  const { db, user } = req;
  const orders = await findAllOrders(db);
  const scopedOrders = scopeOrders(orders, user);
  res.status(200).json(scopedOrders);
});

export default handler;
