import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Home, MessageCircle, Star, Phone, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <div className="text-2xl font-bold text-blue-600">Divine Match</div>

        <nav className="hidden md:flex space-x-8">
          <a
            href="/dashboard"
            className="flex items-center text-gray-700 hover:text-blue-600"
          >
            <Home className="w-5 h-5 mr-1" /> Home
          </a>
          <a
            href="/chat"
            className="flex items-center text-gray-700 hover:text-blue-600"
          >
            <MessageCircle className="w-5 h-5 mr-1" /> Chat
          </a>
          <a
            href="/features"
            className="flex items-center text-gray-700 hover:text-blue-600"
          >
            <Star className="w-5 h-5 mr-1" /> Features
          </a>
          <a
            href="/contact"
            className="flex items-center text-gray-700 hover:text-blue-600"
          >
            <Phone className="w-5 h-5 mr-1" /> Contact
          </a>
        </nav>

        {user && (
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user.username
                )}`}
                alt="user avatar"
                className="w-8 h-8 rounded-full"
              />
              <span className="hidden sm:block font-medium text-gray-700">
                {user.username}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                <ul className="py-1">
                  <li>
                    <button
                      onClick={() => navigate("/profile")}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigate("/settings")}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigate("/change-password")}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Change password
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
