import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../utils/api";
import loginImage from "../assets/LoginVector4.jpg";

const Login = () => {
  const { login } = useAuth(); 
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handlechange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlelogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const trimmedEmail = formData.email.trim();
    const trimmedPassword = formData.password.trim();

    try {
      const response = await axios.post(`${API_BASE_URL}/api/public/api/login`, {
        email: trimmedEmail,
        password: trimmedPassword,
      });

      console.log("Login API Response:", response.data);

      if (response.data.token) {
        toast.success("Login successful");
        login(response.data.token, response.data.user); 
        navigate("/post", { replace: true }); 
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data);
      toast.error(
        error.response?.data?.message ||
        JSON.stringify(error.response?.data?.errors) ||
        "An error occurred during login. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
   <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-sky-800 to-sky-500 px-4">
  <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden">
    
    {/* Image Section - edge to edge */}
    <div className="relative w-full md:w-1/2 h-60 md:h-auto z-10 ">
      <img
        src={loginImage}
        alt="Login Illustration"
        className="w-full h-full object-cover shadow-2xl md:shadow-[20px_0px_40px_-10px_rgba(0,0,0,0.4)] shadow-sky-500 "
      />
    </div>

    {/* Form Section */}
    <div className="w-full md:w-1/2 p-8 md:p-12 bg-gradient-to-l from-sky-600 to-sky-500   ">
      <h2 className="text-2xl font-semibold text-white mb-6 text-center ">
        Login to Your Account
      </h2>

      <form className="space-y-5" onSubmit={handlelogin}>
        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-white mb-1"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handlechange}
            placeholder="you@example.com"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:outline-none transition text-sm bg-gray-50"
            required
          />
        </div>

        {/* Password Field */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-white mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handlechange}
            placeholder="Enter your password"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition text-sm bg-gray-50"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex flex-col items-center gap-3 mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full text-white text-sm font-medium py-2 rounded-lg transition ${
              isSubmitting
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-sky-800 hover:bg-[#1c2e6a]'
            }`}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          {/* <Link
            to="/signup"
            className="text-sm text-blue-600 hover:underline"
          >
            Don't have an account? Sign up
          </Link> */}
        </div>
      </form>
    </div>
  </div>
</div>


  );
};

export default Login;