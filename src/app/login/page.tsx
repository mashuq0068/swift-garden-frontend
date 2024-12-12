/* eslint-disable react/no-unescaped-entities */
"use client";

import { FaEnvelope, FaLock } from "react-icons/fa";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { IUser, setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import Cookies from "js-cookie";

const LoginPage = () => {
  const [signIn] = useLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await signIn({ email, password }).unwrap();
      console.log(res);
      const userData = res?.data ?? {
        name: null,
        email: null,
        role: null,
      };
      const user: IUser = {
        name: userData?.name,
        email: userData?.email,
        role: userData?.role,
      };
      // setting cookies to token
      Cookies.set("token", res?.token);
      // setting user the persist redux store
      dispatch(setUser(user));

      const redirectTo = localStorage.getItem("redirectAfterLogin");
      const role = localStorage.getItem("role");
      if (role === "VENDOR") {
        router.push("/vendor");
      } else {
        if (redirectTo) {
          router.push(redirectTo);
          localStorage.removeItem("redirectAfterLogin");
        } else {
          router.push("/");
        }
      }
      setEmail("");
      setPassword("");
      localStorage.removeItem("role");
    } catch (error) {
      toast.error(
        (error as { message?: string })?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="rounded-lg flex justify-center w-full max-w-4xl">
        <div className="w-full md:w-1/2 p-8 space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-500 text-center">
            Log in to your account to continue
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="relative">
              <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                placeholder="Email Address"
              />
            </div>

            <div className="relative">
              <FaLock className="absolute top-3 left-3 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                placeholder="Password"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            >
              Login
            </button>
          </form>

          <div className="text-center text-gray-500">
            <p>
              Don't have an account?{" "}
              <a
                href="/registration"
                className="text-green-500 hover:underline"
              >
                Sign Up
              </a>
            </p>
            <a href="#" className="text-green-500 hover:underline">
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
