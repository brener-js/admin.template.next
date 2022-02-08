import route from "next/router";
import { createContext, useEffect, useState } from "react";
import User from "../../model/User";
import firebase from "../../services/config";
import Cookies from "js-cookie";

interface AuthContextProps {
  user?: User;
  loginGoogle?: () => Promise<void>;
  login?: (email: string, password: string) => Promise<void>;
  register?: (email: string, password: string) => Promise<void>;
  logout?: () => Promise<void>;
  loading?: boolean;
}

const AuthContext = createContext<AuthContextProps>({});

async function formatUser(userFirebase: firebase.User): Promise<User> {
  const token = await userFirebase.getIdToken;
  return {
    uid: userFirebase.uid,
    name: userFirebase.displayName,
    email: userFirebase.email,
    token: String(token),
    provider: userFirebase.providerData[0].providerId,
    imageUrl: userFirebase.photoURL,
  };
}

function manageCookie(logged: boolean) {
  if (logged) {
    Cookies.set("admin-template-auth", logged, {
      expires: 7,
    });
  } else {
    Cookies.remove("admin-template-auth");
  }
}

export function AuthProvider(props) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>(null);

  async function configSession(userFirebase) {
    if (userFirebase?.email) {
      const user = await formatUser(userFirebase);
      setUser(user);
      manageCookie(true);
      setLoading(false);
      return user.email;
    } else {
      setUser(null);
      manageCookie(false);
      setLoading(false);
      return false;
    }
  }

  async function login(email, password) {
    try {
      setLoading(true);
      const resp = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

      await configSession(resp.user);
      route.push("/");
    } finally {
      setLoading(false);
    }
  }

  async function register(email, password) {
    try {
      setLoading(true);
      const resp = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      await configSession(resp.user);
      route.push("/");
    } finally {
      setLoading(false);
    }
  }

  async function loginGoogle() {
    try {
      setLoading(true);
      const resp = await firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider());

      await configSession(resp.user);
      route.push("/");
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      setLoading(true);
      await firebase.auth().signOut();
      await configSession(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (Cookies.get("admin-template-auth")) {
      const cancelObserver = firebase.auth().onIdTokenChanged(configSession);
      return () => cancelObserver();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loginGoogle, logout, loading, login, register }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
