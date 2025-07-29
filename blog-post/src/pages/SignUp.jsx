import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../utils/api";

const SignUp = () => {
  const { login } = useAuth(); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    location: "",
    services: "",
  });

  const handlechange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/public/api/register`, formData);

      if (response.data.token) {
        toast.success("Registration successful!");

        const { token, user } = response.data;

        login(token, user); 
        navigate("/login", { replace: true });
      } else {
        toast.error(response.data.message || "Signup failed.");
      }
    } catch (error) {
      console.error("Signup Error:", error.response?.data);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="w-[90%] md:w-[450px] h-[550px] p-5 rounded-2xl bg-gray-100 shadow-xl">
        <div className="flex justify-center items-center mb-4">
          <h1 className="text-xs lg:text-xl font-sans font-medium">Create an Account</h1>
        </div>

        <form className="mt-3" onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="mb-5">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
                User Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handlechange}
                className="bg-gray-100 border border-gray-200 text-sm rounded-lg w-full p-2.5"
                required
              />
            </div>

            <div className="mb-5">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                Your email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handlechange}
                className="bg-gray-100 border border-gray-200 text-sm rounded-lg w-full p-2.5"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="mb-5">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                Your password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handlechange}
                className="bg-gray-100 border border-gray-200 text-sm rounded-lg w-full p-2.5"
                required
              />
            </div>

            <div className="mb-5">
              <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-gray-900">
                Mobile
              </label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handlechange}
                className="bg-gray-100 border border-gray-200 text-sm rounded-lg w-full p-2.5"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="mb-5">
              <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handlechange}
                className="bg-gray-100 border border-gray-200 text-sm rounded-lg w-full p-2.5"
                required
              />
            </div>

            <div className="mb-5">
              <label htmlFor="services" className="block mb-2 text-sm font-medium text-gray-900">
                Services
              </label>
              <input
                type="text"
                id="services"
                name="services"
                value={formData.services}
                onChange={handlechange}
                className="bg-gray-100 border border-gray-200 text-sm rounded-lg w-full p-2.5"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 items-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm min-w-[150px] py-2 px-6"
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>

            <Link to="/" className="font-medium text-blue-600 hover:underline text-sm">
              Already have an account? Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
