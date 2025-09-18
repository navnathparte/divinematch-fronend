// src/pages/Login.tsx
import { useState, type ChangeEvent, type FormEvent } from "react";
import API from "../api/request";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import bgImage from "../assets/image.png";
import { Link } from "react-router-dom";

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      const { token, user } = res.data;
      await login(token, user);
      navigate("/dashboard");
    } catch (err: any) {
      toast.error(err.response?.data?.error);
    }
  };

  return (
    <div
      className="w-full h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8"
      >
        {/* Title */}
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Welcome to Divine Match
          </h2>
          <h4 className="text-gray-600 text-sm">
            Login to find your perfect match
          </h4>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="your.email@example.com"
            value={form.email}
            onChange={handleChange}
            autoComplete="username"
            className="w-full h-[45px] px-3 text-sm rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-[#F36653]"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-1">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <Link
              to="/forgotPassword"
              className="text-[#F36653] text-xs font-medium hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <input
            id="password"
            name="password"
            type="password"
            placeholder="********"
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
            className="w-full h-[45px] px-3 text-sm rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-[#F36653]"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full h-11 flex items-center justify-center font-medium text-white bg-[#F36653] rounded-md hover:bg-[#C4230E] active:bg-[#971B0B] disabled:opacity-40"
        >
          Login to your account
        </button>

        {/* Register */}
        <div className="mt-4 text-center text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="ml-1 text-[#F36653] font-medium hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}
