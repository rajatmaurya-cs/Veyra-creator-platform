"use client";

import { useState, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

import { AuthContext } from "@/app/ContextProvider/AuthProvider";

// ---------------- TYPES ----------------

type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "ADMIN" | "USER";
  createdAt: string;
};

type LoginResponse = {
  success: boolean;
  user: User;
};

// ---------------- COMPONENT ----------------

export default function LoginPage() {

  const { setLoggedIn, setUser } = useContext(AuthContext);

  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // ---------------- LOGIN API ----------------

  const loginMutation = useMutation<
    LoginResponse,
    Error,
    { email: string; password: string }
  >({

    mutationFn: async ({ email, password }) => {

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data: LoginResponse = await res.json();

      if (!res.ok || !data.success) {
        throw new Error("Login failed");
      }

      return data;
    },

    onSuccess: (data) => {

      setLoggedIn(true);

      setUser(data.user);

      toast.success("Login successful");

      if (data.user.role === "ADMIN") {

        router.replace("/admin");

      } else {

        router.replace("/");
      }
    },

    onError: (err) => {

      toast.error(err.message || "Something went wrong");

    },
  });

  // ---------------- HANDLERS ----------------

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    loginMutation.mutate({
      email,
      password,
    });
  };

  const isLoading = loginMutation.isPending;


  const handleGoogleLogin = ()=>{
    console.log("handleGoogleLogin from Fronted")
    window.location.href = "http://localhost:2000/api/auth/google";
  }

  // ---------------- UI ----------------

  return (

    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-[#0b0d11]
        px-4
      "
    >

      <div
        className="
          w-full
          max-w-md
          rounded-3xl
          border
          border-[#20242c]
          bg-[#111418]
          p-8
          shadow-[0_0_40px_rgba(0,0,0,0.35)]
        "
      >

        {/* ---------- HEADER ---------- */}

        <div className="mb-8">

          <div className="flex items-center justify-center gap-3">

            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                bg-[#1b2028]
                ring-1
                ring-[#2a2f3a]
              "
            >
              <span className="text-lg font-bold text-[#f3f4f6]">
                P
              </span>
            </div>

            <div>

              <h1 className="text-2xl font-bold text-[#f3f4f6]">
                Postify
              </h1>

              <p className="text-sm text-[#7d8590]">
                Welcome back
              </p>

            </div>
          </div>
        </div>

        {/* ---------- FORM ---------- */}

        <form onSubmit={handleLogin} className="space-y-5">

          {/* EMAIL */}

          <div>

            <label className="mb-2 block text-sm text-[#9ca3af]">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="
                w-full
                rounded-2xl
                border
                border-[#2a2f3a]
                bg-[#171b22]
                px-4
                py-3
                text-[#f3f4f6]
                outline-none
                transition-all
                placeholder:text-[#6b7280]
                focus:border-[#3b4250]
                focus:bg-[#1b2028]
              "
            />
          </div>

          {/* PASSWORD */}

          <div>

            <label className="mb-2 block text-sm text-[#9ca3af]">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="
                w-full
                rounded-2xl
                border
                border-[#2a2f3a]
                bg-[#171b22]
                px-4
                py-3
                text-[#f3f4f6]
                outline-none
                transition-all
                placeholder:text-[#6b7280]
                focus:border-[#3b4250]
                focus:bg-[#1b2028]
              "
            />
          </div>

          {/* FORGOT PASSWORD */}

          <div className="flex justify-end">

            <button
              type="button"
              onClick={() => router.push("/auth/forgot-password")}
              className="
                text-sm
                text-[#8b93a7]
                transition-colors
                hover:text-[#d1d5db]
              "
            >
              Forgot Password?
            </button>
          </div>

          {/* LOGIN BUTTON */}

          <button
            type="submit"
            disabled={isLoading}
            className="
              w-full
              rounded-2xl
              bg-[#f3f4f6]
              py-3.5
              text-sm
              font-semibold
              text-[#111418]
              transition-all
              duration-300
              hover:opacity-90
              active:scale-[0.99]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>

        </form>

        {/* ---------- DIVIDER ---------- */}

        <div className="relative my-8">

          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#2a2f3a]" />
          </div>

          <div className="relative flex justify-center">

            <span
              className="
                bg-[#111418]
                px-4
                text-xs
                font-medium
                tracking-[0.2em]
                text-[#7d8590]
              "
            >
              OR CONTINUE WITH
            </span>

          </div>
        </div>

        {/* ---------- GOOGLE LOGIN ---------- */}

        <button
          type="button"
          onClick={()=>handleGoogleLogin()}
          className="
            group
            relative
            w-full
            overflow-hidden
            rounded-2xl
            border
            border-[#2a2f3a]
            bg-[#171b22]
            px-5
            py-3.5
            transition-all
            duration-300
            hover:border-[#3b4250]
            hover:bg-[#1c2129]
            active:scale-[0.99]
          "
        >

          <div
            className="
              absolute
              inset-0
              opacity-0
              transition-opacity
              duration-300
              group-hover:opacity-100
              bg-gradient-to-r
              from-white/[0.03]
              via-transparent
              to-white/[0.03]
            "
          />

          <div className="relative flex items-center justify-center gap-3">

            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-[#20252e]
                ring-1
                ring-[#2f3541]
              "
            >

              <Image
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                width={20}
                height={20}
              />

            </div>

            <div className="flex flex-col items-start">

              <span className="text-sm font-semibold text-[#e5e7eb]">
                Continue with Google
              </span>

              <span className="text-xs text-[#7d8590]">
                Fast & secure authentication
              </span>

            </div>
          </div>
        </button>

        {/* ---------- SIGNUP ---------- */}

        <p className="mt-8 text-center text-sm text-[#7d8590]">

          Don&apos;t have an account?{" "}

          <span
            onClick={() => router.push("/auth/signup")}
            className="
              cursor-pointer
              font-medium
              text-[#d1d5db]
              transition-colors
              hover:text-white
            "
          >
            Create account
          </span>

        </p>

      </div>
    </div>
  );
}