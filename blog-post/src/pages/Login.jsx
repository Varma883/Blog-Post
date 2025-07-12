import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../utils/api";

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

   const [error, setError] = useState("");

    const handlelogin = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setError("");
      try {
        const response = await axios.post(
          `${API_BASE_URL}/api/public/api/login`,
          {
            email: formData.email,
            password: formData.password,
          }
        );

        //to store the token
        console.log("Login API Response:", response.data);

if (response.data.status || response.data.token) {
  toast.success("Login successful");
  localStorage.setItem("authToken", response.data.token);


  login(response.data.token); // use context
  navigate("/post", { replace: true });
} else {
  toast.error(response.data.message || "Login failed");
}
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "An error occurred during login. Please try again."
        );
      } finally {
        setIsSubmitting(false);
      }
    };
  return (
    <div className="min-h-screen  flex  justify-center items-center">
      <div className="w-[90%]  md:w-[350px] h-[350px]  p-5 rounded-2xl bg-gray-100 shadow-xl">
        <div className="flex  justify-center items-center mb-4">
          <h1 className="text-xs lg:text-xl  font-sans font-medium">
            Login To Account
          </h1>
        </div>

        <form className="mt-3" onSubmit={handlelogin}>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handlechange}
              className="bg-gray-100 border border-gray-200 text-gray-900 text-sm rounded-lg w-full p-2.5"
              placeholder="youremailid@domain.com"
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handlechange}
              className="bg-gray-100 border border-gray-200 text-black text-sm rounded-lg block w-full p-2.5"
              required
            />
          </div>

          <div className="flex flex-col gap-3 items-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm min-w-[150px] py-2 px-6 text-center whitespace-nowrap transition-all duration-200"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>

            <Link
              to={"/signup"}
              href="#"
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline text-sm"
            >
              Don't have an account? Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
