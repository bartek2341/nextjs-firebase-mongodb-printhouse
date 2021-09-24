import admin from "@/firebase/admin";

const authCompleted = async (req, res, next) => {
  try {
    const userDocument = await admin
      .firestore()
      .doc(`users/${req.user.user_id}`)
      .get();
    req.user = { ...req.user, ...userDocument.data() };
  } catch (err) {
    return res.status(403).end();
  }
  next();
};

export default authCompleted;
