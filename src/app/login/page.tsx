/* eslint-disable react/no-unescaped-entities */
"use client"
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import Image from "next/image";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { IUser, setUser } from "@/redux/features/auth/authSlice";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from 'axios'

const LoginPage = () => {
  const [login, { isLoading, error }] = useLoginMutation();
  const [search] = useState(null)
 
  const router = useRouter()
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    axios.get(`http://localhost:5000/api/users/admins?search=${search}`)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  },[])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const res = await login({ email, password }).unwrap();
      
      if (res?.success) {
        const { token, data: { name, email: userEmail, role, image } } = res;
  
        Cookies.set("token", token, { expires: 7 });
  
        const user: IUser = {
          name,
          email: userEmail,
          role,
          image
        };
  
        dispatch(setUser(user));
  
        toast.success("You logged in successfully");
        router.push("/news-feed");
      } else {
        toast.error("Invalid email or password");
      }
    } catch (err) {
      console.error("Login failed: ", err);
      toast.error("Invalid email or password");
    }
  };
  
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="rounded-lg flex w-full max-w-4xl">
        <div className="hidden md:flex md:w-1/2 relative">
          <Image
            src="/images/login.png"
            alt="Login Image"
            layout="fill"
            objectFit="contain"
            className="rounded-l-lg"
          />
        </div>

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
                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
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
                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                placeholder="Password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            >
              {isLoading ? "Logging In..." : "Log In"}
            </button>

            {error && (
              <p className="text-red-500 text-center">
                {(error as { message?: string }).message}
              </p>
            )}
          </form>

          <div className="text-center text-gray-500">
            <p>
              Don't have an account?{" "}
              <a
                href="/registration"
                className="text-purple-500 hover:underline"
              >
                Sign Up
              </a>
            </p>
            <a href="#" className="text-purple-600 hover:underline">
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
