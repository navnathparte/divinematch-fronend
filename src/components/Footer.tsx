import { Facebook, Instagram, Linkedin, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="sticky bottom-0 bg-white shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between px-6 py-4">
        {/* Left: Logo */}
        <div className="text-lg font-bold text-blue-600 mb-3 sm:mb-0">
          Divine Match
        </div>

        {/* Right: Social Icons */}
        <div className="flex space-x-4 text-gray-600">
          <a
            href="https://facebook.com"
            target="_blank"
            className="hover:text-blue-600"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            className="hover:text-pink-500"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            className="hover:text-blue-700"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            className="hover:text-sky-500"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a href="mailto:support@myapp.com" className="hover:text-red-500">
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
