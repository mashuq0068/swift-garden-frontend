"use client";

import Image from "next/image";
import { FaUserAlt, FaEnvelope, FaLock, FaImage } from "react-icons/fa";
import { useState } from "react";
import { useSignUpMutation } from "@/redux/features/auth/auth.api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";




const RegistrationPage = () => {
  const router = useRouter()
  const [imageUrl, setImageUrl] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUp] = useSignUpMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    // Handle form submission logic, e.g., sending data to an API
    const userData = {
      name: fullName,
      email: email,
      password: password,
      image: imageUrl,
    };

    try {
      await signUp(userData).unwrap();
      toast.success("You successfully created your account");
       router.push('/login')
      setFullName("");
      setEmail("");
      setPassword("");
      setImageUrl("");
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="rounded-lg flex w-full max-w-4xl">
        {/* Left Side Image */}
        <div className="hidden md:flex md:w-1/2 relative">
          <Image
            src="/images/reg.png"
            alt="Registration Image"
            layout="fill"
            objectFit="cover"
            className="rounded-l-lg"
          />
        </div>

        {/* Right Side - Registration Form */}
        <div className="w-full md:w-1/2 p-8 space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Create an Account
          </h2>
          <p className="text-sm text-gray-500 text-center">
            Fill in the details below to sign up for your account
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="relative">
              <FaUserAlt className="absolute top-[30%] left-3 text-gray-400" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                placeholder="Full Name"
                required
              />
            </div>

            {/* Email Address */}
            <div className="relative">
              <FaEnvelope className="absolute top-[30%] left-3 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                placeholder="Email Address"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <FaLock className="absolute top-[30%] left-3 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                placeholder="Password"
                required
              />
            </div>

            {/* Image URL */}
            <div className="relative">
              <FaImage className="absolute top-[30%] left-3 text-gray-400" />
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                placeholder="Image URL (optional)"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            >
              Sign Up
            </button>
          </form>

          <div className="text-center text-gray-500">
            <p>
              Already have an account?{" "}
              <a href="/login" className="text-purple-600 hover:underline">
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
