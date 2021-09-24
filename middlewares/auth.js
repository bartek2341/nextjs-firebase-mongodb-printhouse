import admin from "@/firebase/admin";

const auth = async (req, res, next) => {
  try {
    const authToken = req.cookies.auth;
    const decodedToken = await admin.auth().verifyIdToken(authToken);
    req.user = decodedToken;
    next();
  } catch (err) {
    return res.status(401).end();
  }
};

export default auth;
