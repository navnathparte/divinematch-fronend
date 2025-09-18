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
        className="
      w-[400px] bg-white shadow-lg rounded-[16px] p-[32px]
      sm:w-[352px] xs:w-[320px]
    "
      >
        {/* Title */}
        <div className="text-center mb-[16px]">
          <h2 className="text-[24px] font-bold text-[#171A1F] leading-[32px]">
            Welcome to Divine Match
          </h2>
          <h4 className="text-[#565D6D] text-[14px] leading-[20px]">
            Login to find your perfect match
          </h4>
        </div>

        {/* Email */}
        <div className="mb-[16px]">
          <label
            htmlFor="email"
            className="block text-[14px] font-medium text-[#171A1F] mb-[4px]"
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
            className="
          w-[320px] h-[45px] px-[12px] text-[14px]
          rounded-[6px] border border-[#DEE1E6]
          outline-none focus:ring-2 focus:ring-[#F36653]
        "
          />
        </div>

        {/* Password */}
        <div className="mb-[24px]">
          <div className="flex items-center justify-between mb-[4px]">
            <label
              htmlFor="password"
              className="text-[14px] font-medium text-[#171A1F]"
            >
              Password
            </label>

            <Link
              to="/forgotPassword"
              className="text-[#F36653] text-[12px] font-medium hover:underline"
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
            className="
          w-[320px] h-[45px] px-[12px] text-[14px]
          rounded-[6px] border border-[#DEE1E6]
          outline-none focus:ring-2 focus:ring-[#F36653]
        "
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="
        w-[320px] h-[44px] flex items-center justify-center
        text-[14px] font-medium text-white
        rounded-[6px] bg-[#F36653]
        hover:bg-[#C4230E] active:bg-[#971B0B]
        disabled:opacity-40
      "
        >
          Login to your account
        </button>

        {/* Register */}
        <div className="mt-[16px] text-center text-[14px] text-[#565D6D]">
          Don’t have an account?
          <Link
            to="/register"
            className="ml-[4px] text-[#F36653] font-medium hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}
