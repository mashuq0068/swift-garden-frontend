"use client";
import { FaUserAlt, FaEnvelope, FaLock } from "react-icons/fa";
import { ChangeEvent, FormEvent, useState } from "react";
import { useSignUpMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const RegistrationPage = () => {
  const [signUp] = useSignUpMutation();
  const router = useRouter();

  // Single state for form data, including role
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  // Handle input change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signUp(formData).unwrap();
      toast.success("You registered successfully");
      router.push("/login");
      localStorage.setItem("role", formData.role);
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "",
      });
    } catch (error) {
      toast.error(
        (error as { message?: string })?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="rounded-lg flex justify-center w-full max-w-4xl">
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
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                placeholder="Full Name"
                required
              />
            </div>

            {/* Email Address */}
            <div className="relative">
              <FaEnvelope className="absolute top-[30%] left-3 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                placeholder="Email Address"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <FaLock className="absolute top-[30%] left-3 text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                placeholder="Password"
                required
              />
            </div>

            {/* Role Dropdown */}
            <div className="relative">
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="pl-3 pr-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                required
              >
                <option value="" disabled selected>
                  Select Role
                </option>
                <option value="USER">Customer</option>
                <option value="VENDOR">Vendor</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            >
              Sign Up
            </button>
          </form>

          <div className="text-center text-gray-500">
            <p>
              Already have an account?{" "}
              <a href="/login" className="text-green-500 hover:underline">
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
