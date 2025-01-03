/* eslint-disable react/no-unescaped-entities */
"use client";

import { FaEnvelope, FaLock } from "react-icons/fa";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { IUser, setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Cookies from "js-cookie";
import useLoadingStore from "@/store/loadingStore";

const LoginPage = () => {
  const [signIn] = useLoginMutation();
  const auth = useAppSelector((state) => state.auth);
  const { setLoading } = useLoadingStore();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showCredentials, setShowCredentials] = useState(true); // State to toggle visibility

  useEffect(() => {
    if (auth.role) {
      setLoading(false);
      if (auth.role === "VENDOR") {
        router.push("/vendor");
      } else if (auth.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    }
  }, [auth.role, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signIn({ email, password }).unwrap();
      const user: IUser = {
        id: res?.data?.id || null,
        name: res?.data?.name || null,
        email: res?.data?.email || null,
        role: res?.data?.role || null,
      };
      Cookies.set("token", res?.token);
      dispatch(setUser(user));
    } catch (error) {
      toast.error(
        (error as { message?: string })?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative">
      {/* Demo Credentials Tooltip */}
      {showCredentials && (
        <div className="absolute lg:block hidden top-8 right-8 bg-white shadow-lg border border-gray-200 rounded-lg p-6 w-80 z-50">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-bold text-gray-700">Login Credentials</h3>
            <button
              onClick={() => setShowCredentials(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              &#x2715; {/* Close button */}
            </button>
          </div>
          <div className="space-y-2 text-sm">
            <div>
              <strong>Customer:</strong> <br />
              Email: <span className="text-gray-600">user123@gmail.com</span> <br />
              Password: <span className="text-gray-600">user123</span>
            </div>
            <div>
              <strong>Vendor:</strong> <br />
              Email: <span className="text-gray-600">vendor123@gmail.com</span> <br />
              Password: <span className="text-gray-600">vendor123</span>
            </div>
            <div>
              <strong>Admin:</strong> <br />
              Email: <span className="text-gray-600">admin123@gmail.com</span> <br />
              Password: <span className="text-gray-600">admin123</span>
            </div>
          </div>
        </div>
      )}

      {/* Login Form */}
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
