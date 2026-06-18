"use client";

import {
  createContext,
  useState,
  useContext,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";

import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";

// ---------------- TYPES ----------------

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
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  setLoggedIn: (v: boolean) => void;
  authloading: boolean;
  refetchUser: () => void;
};

// ---------------- CONTEXT ----------------

export const AuthContext = createContext<AuthContextType | null>(null);

// ---------------- PROVIDER ----------------

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [manualUser, setManualUser] = useState<User | null>(null);
  const [manualLoggedIn, setManualLoggedIn] = useState<boolean | null>(null);

  // ---------------- QUERY ----------------
  const { data, isLoading, refetch, isError } = useQuery<User>({
    queryKey: ["auth-user"],
    queryFn: async () => {
      console.log("Querying session state from URL:", `${process.env.NEXT_PUBLIC_API_URL}/auth/me`);
      const res = await apiFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/me`
      );

      if (!res.ok) throw new Error("Not authenticated");

      const result = await res.json();
      return result.user;
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  // When the query resolves successfully, sync to manual state and clear overrides
  useEffect(() => {
    if (data) {
      setManualUser(data);
      setManualLoggedIn(true);
    }
    if (isError) {
      if (manualLoggedIn === null) {
        setManualUser(null);
        setManualLoggedIn(false);
      }
    }
  }, [data, isError, manualLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        user: manualUser,
        loggedIn: manualLoggedIn ?? false,
        setUser: setManualUser as Dispatch<SetStateAction<User | null>>,
        setLoggedIn: setManualLoggedIn as (v: boolean) => void,
        authloading: isLoading && manualLoggedIn === null,
        refetchUser: refetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ---------------- HOOK ----------------
