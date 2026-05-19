"use client";

import {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";

// ---------------- TYPE ----------------

type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "ADMIN" | "USER";
  createdAt: string;
};

type AuthContextType = {
  loggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  refreshAccessToken: () => Promise<boolean>;
};
// ---------------- CONTEXT ----------------

export const AuthContext = createContext<AuthContextType | null>(null);

let refreshPromiseRef: Promise<boolean> | null = null;

// ---------------- PROVIDER ----------------

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loggedIn, setLoggedIn] = useState(false);

  const [user, setUser] = useState<User | null>(null);

  const refreshAccessToken = useCallback(async (): Promise<boolean> => {
    if (refreshPromiseRef) return refreshPromiseRef;

    refreshPromiseRef = (async (): Promise<boolean> => {
      try {
        console.log("Refreshing access token");

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refreshtoken`,
          {
            method: "POST",
            credentials: "include",
          }
        );

        const data: { user?: User } = await res.json();

        if (res.ok && data.user) {
          setUser(data.user);
          setLoggedIn(true);
          return true;
        }

        setUser(null);
        setLoggedIn(false);

        return false;
      } catch (error) {
        console.log(error);

        setUser(null);
        setLoggedIn(false);

        return false;
      } finally {
        refreshPromiseRef = null;
      }
    })();

    return refreshPromiseRef;
  }, []);

  // ✅ THIS FIXES PAGE RELOAD ISSUE
 useEffect(() => {
  if (!user) {
    refreshAccessToken();
  }
}, [user]);

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        user,
        refreshAccessToken,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}