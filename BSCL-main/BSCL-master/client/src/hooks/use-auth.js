import { createContext, useContext, useState, useEffect } from 'react';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from 'firebase/auth';

const authContext = createContext();

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

const useProvideAuth = () => {
  const [state, setState] = useState(null);
  const [role, setRole] = useState(null);

  const login = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).catch(() => {});
  };

  const logout = () => {
    const auth = getAuth();
    signOut(auth).catch(() => {});
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        auth.currentUser.getIdTokenResult().then((token) => {
          setState(user);
          setRole(token.claims.role);
        });
      } else {
        setState(false);
        setRole(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return { state, role, login, logout };
};
