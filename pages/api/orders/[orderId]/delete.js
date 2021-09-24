import nc from "next-connect";
import {
  mongodb,
  auth,
  authCompleted,
  setOrder,
  deleteOrder,
  basicRateLimit,
} from "@/middlewares/index";
import { deleteOrderById } from "@/mongodb/index";
import admin from "@/firebase/admin";

const handler = nc();
handler
  .use(basicRateLimit)
  .use(mongodb)
  .use(auth)
  .use(authCompleted)
  .use(setOrder)
  .use(deleteOrder);

handler.delete(async (req, res) => {
  const { order, db } = req;
  const bucket = admin
    .storage()
    .bucket(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET);
  try {
    await bucket.deleteFiles({
      prefix: `userFiles/${order.user.user_id}/${order._id}/`,
    });
    const orderId = await deleteOrderById(order._id, db);
    res.status(200).send(orderId);
  } catch (err) {
    return res.status(400).end();
  }
});

export default handler;
