import { useState, type ChangeEvent, type FormEvent } from "react";
import API from "../api/request";
import { toast } from "react-toastify";
import bgImage from "../assets/image-2.png";

interface RegisterForm {
  username: string;
  email: string;
  password: string;
}

export default function Register() {
  const [form, setForm] = useState<RegisterForm>({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await API.post("/auth/register", form);
      // console.log('data', data?.data?.message)
      toast.success(data?.data?.message);
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="w-[384px] max-w-full bg-white rounded-xl shadow-md shadow-gray-200 p-8"
        >
          <h2 className="text-[36px] leading-10 font-bold text-[#171A1F] font-outfit mb-4">
            Join SoulMatch
          </h2>

          <h6 className="w-[336px] max-w-full text-sm leading-5 font-normal text-[#565D6D] font-inter mb-6">
            Discover meaningful connections. Sign up now to find your perfect
            match!
          </h6>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-[#171A1F]">
              Full Name
            </label>
            <input
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="w-[336px] max-w-full h-[45px] px-3 text-sm border border-[#DEE1E6] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-[#171A1F]">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-[336px] max-w-full h-[45px] px-3 text-sm border border-[#DEE1E6] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-1 text-sm font-medium text-[#171A1F]">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-[336px] max-w-full h-[45px] px-3 text-sm border border-[#DEE1E6] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-[336px] max-w-full h-10 flex items-center justify-center 
        text-white text-sm font-medium font-inter rounded-md 
        bg-[#F36451] hover:bg-[#EF2E14] active:bg-[#D3260F] disabled:opacity-40"
          >
            Create Account
          </button>

          <div className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-[#F36451] font-medium hover:underline"
            >
              Login
            </a>
          </div>
        </form>
      </div>

      <div
        className="hidden md:flex flex-1 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
    </div>
  );
}
