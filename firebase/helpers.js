import firebase from "./index";
import cookies from "js-cookie";
import { authCookieExpireTime } from "@/data/index";

export const getUserDocument = async (user) => {
  try {
    const userDocument = await firebase
      .firestore()
      .doc(`users/${user.user_id}`)
      .get();
    if (!userDocument) return user;
    return {
      ...user,
      ...userDocument.data(),
    };
  } catch (error) {
    console.error("Error fetching user document", error);
  }
};

export const clearAuthCookie = () => {
  cookies.remove("auth");
};

export const setAuthCookie = (token) => {
  cookies.set("auth", token, {
    expires: authCookieExpireTime,
  });
};
