import nc from "next-connect";
import {
  mongodb,
  auth,
  authCompleted,
  basicRateLimit,
} from "@/middlewares/index";
import { findAllUserOrders, deleteOrderById } from "@/mongodb/index";
import admin from "@/firebase/admin";

const handler = nc();
handler.use(basicRateLimit).use(mongodb).use(auth).use(authCompleted);

handler.delete(async (req, res) => {
  const { user, db } = req;

  const userOrders = await findAllUserOrders(user, db);
  const bucket = admin
    .storage()
    .bucket(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET);

  for (const order of userOrders) {
    try {
      await bucket.deleteFiles({
        prefix: `userFiles/${order.user.user_id}/${order._id}/`,
      });
      await deleteOrderById(order._id, db);
    } catch (err) {
      return res.status(400).end();
    }
  }

  return res.status(200).end();
});

export default handler;
