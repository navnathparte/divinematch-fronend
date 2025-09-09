// src/components/ResetPassword.tsx
import { useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api/request";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const { email} = (location.state as { email: string; }) || {};

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await API.post("/auth/reset-password", {
        email,
        newPassword: password,
      });
      toast.success("Password updated successfully!");
      navigate("/login");
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Reset Password
        </h2>

        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}
