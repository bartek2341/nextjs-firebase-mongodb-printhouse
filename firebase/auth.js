import { useContext, useState, useEffect, createContext } from "react";
import firebase from "./index";
import { getUserDocument, clearAuthCookie, setAuthCookie } from "./helpers";
import { cache } from "swr";

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProviderAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProviderAuth() {
  const [user, setUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  const signup = (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  };

  const login = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    cache.clear(`/api/orders`);
    return firebase.auth().signOut();
  };

  const updatePassword = (password) => {
    return firebase.auth().currentUser.updatePassword(password);
  };

  const deleteUser = () => {
    return firebase.auth().currentUser.delete();
  };

  const deleteUserData = () => {
    return firebase.firestore().doc(`users/${user.user_id}`).delete();
  };

  const refetchUser = async () => {
    setUser(await getUserDocument(user));
  };

  const resetPassword = async (email) => {
    return firebase.auth().sendPasswordResetEmail(email);
  };

  const reauthenticate = (password) => {
    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      password
    );
    return firebase.auth().currentUser.reauthenticateWithCredential(credential);
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (userAuth) => {
      if (!userAuth) {
        setUser(null);
        clearAuthCookie();
      } else {
        const tokenResult = await userAuth.getIdTokenResult();
        const { token, claims } = tokenResult;
        setUser(await getUserDocument(claims));
        setAuthCookie(token);
      }
      setIsLoadingUser(false);
    });
    return () => unsubscribe();
  }, []);

  return {
    user,
    isLoadingUser,
    setUser,
    signup,
    login,
    logout,
    updatePassword,
    reauthenticate,
    deleteUser,
    deleteUserData,
    refetchUser,
    resetPassword,
  };
}
