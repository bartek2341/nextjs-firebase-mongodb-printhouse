import nc from "next-connect";
import admin from "@/firebase/admin";
import { mongodb, auth, basicRateLimit } from "@/middlewares/index";
import { normalizeUserData, userDataValidation } from "@/lib/index";

const handler = nc();
handler.use(basicRateLimit).use(mongodb).use(auth);

handler.post(async (req, res) => {
  const { user, body } = req;

  const isUserDataValid = userDataValidation(body);
  if (!isUserDataValid) return res.status(400).end();

  const userRef = admin.firestore().doc(`users/${user.user_id}`);
  const snapshot = await userRef.get();
  normalizeUserData(body.data);

  if (!snapshot.exists) {
    await userRef.set(body);
  } else {
    await userRef.update(body);
  }
  res.status(200).end();
});

export default handler;
