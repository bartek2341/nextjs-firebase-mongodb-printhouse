import nc from "next-connect";
import { auth, basicRateLimit } from "@/middlewares/index";
import admin from "@/firebase/admin";

const handler = nc();

handler.use(basicRateLimit).use(auth);

handler.get(async (req, res) => {
  const { user } = req;
  if (user.isAdmin) {
    await admin.auth().setCustomUserClaims(user.user_id, { isAdmin: null });
  } else {
    await admin.auth().setCustomUserClaims(user.user_id, { isAdmin: true });
  }
  res.status(200).end();
});

export default handler;
