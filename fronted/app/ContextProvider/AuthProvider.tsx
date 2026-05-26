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

// let refreshPromiseRef: Promise<boolean> | null = null;

// ---------------- PROVIDER ----------------

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loggedIn, setLoggedIn] = useState(false);

  const [user, setUser] = useState<User | null>(null);


useEffect(() => {
  const getUser = async () => {
    console.log("Page reload happend")
    try {
      const res = await fetch("http://localhost:2000/api/auth/me", {
        credentials: "include",
      });

      // if status code is not 2xx
      if (!res.ok) {
        setLoggedIn(false);
        setUser(null);
        return;
      }

      const data = await res.json();

      if (data.success) {
        setUser(data.user);
        setLoggedIn(true);
      } else {
        setUser(null);
        setLoggedIn(false);
      }

    } catch (error) {

      // fetch failed completely
      console.error("Error fetching user:", error);

      setUser(null);
      setLoggedIn(false);
    }
  };

  getUser();
}, []);

//   const refreshAccessToken = useCallback(async (): Promise<boolean> => {
//     if (refreshPromiseRef) return refreshPromiseRef;

//     refreshPromiseRef = (async (): Promise<boolean> => {
//       try {
//         console.log("Refreshing access token");

//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URL}/auth/refreshtoken`,
//           {
//             method: "POST",
//             credentials: "include",
//           }
//         );

//         const data: { user?: User } = await res.json();

//         if (res.ok && data.user) {
//           setUser(data.user);
//           setLoggedIn(true);
//           return true;
//         }

//         setUser(null);
//         setLoggedIn(false);

//         return false;
//       } catch (error) {
//         console.log(error);

//         setUser(null);
//         setLoggedIn(false);

//         return false;
//       } finally {
//         refreshPromiseRef = null;
//       }
//     })();

//     return refreshPromiseRef;
//   }, []);

//   // ✅ THIS FIXES PAGE RELOAD ISSUE
//  useEffect(() => {
//   if (!user) {
//     refreshAccessToken();
//   }
// }, [user]);

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        user,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}