import { useState, useEffect } from "react";
import { Sun, Moon, Menu, X, Shield } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import useTheme from "../hooks/useTheme";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    const daisyTheme = newTheme === "light" ? "lemonade" : "forest";
    localStorage.setItem("theme", daisyTheme);
    document.documentElement.setAttribute("data-theme", daisyTheme);
  };

  useEffect(() => {
    // Set theme on mount
    const saved = localStorage.getItem("theme") || "lemonade";
    const current = saved === "forest" ? "dark" : "light";
    setTheme(current);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const handleNavClick = (sectionId) => {
    setIsMenuOpen(false);

    if (location.pathname === "/") {
      const section = document.getElementById(sectionId);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  return (
    <div className="bg-base-100 shadow-md sticky top-0 z-50">
      <div className="px-4 py-3 flex justify-between items-center">

        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-md flex items-center justify-center">
            <Shield className="w-5 h-5 text-base-content" />
          </div>
          <span className="text-2xl font-bold text-base-content">EasyAccess</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex gap-4 items-center">
          <button
            onClick={() => handleNavClick("about")}
            className="btn btn-ghost btn-sm hover:bg-base-200 text-base-content"
          >
            About
          </button>
          <button
            onClick={() => handleNavClick("contact")}
            className="btn btn-ghost btn-sm hover:bg-base-200 text-base-content"
          >
            Contact
          </button>
          <button
            onClick={() => navigate("/login")}
            className="btn btn-ghost btn-sm hover:bg-base-200 text-base-content"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="btn btn-primary btn-sm"
          >
            Sign-up
          </button>
          <button
            onClick={toggleTheme}
            className="btn btn-sm btn-ghost text-base-content"
          >
            {theme === "light" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden flex items-center gap-2">
          <button onClick={toggleTheme} className="btn btn-sm btn-ghost text-base-content">
            {theme === "light" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="btn btn-ghost btn-square text-base-content"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition mx-auto flex justify-center duration-300 overflow-hidden bg-base-100 border-t border-base-200 ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="menu p-4 flex flex-col items-center space-y-2">
          <li>
            <button
              onClick={() => handleNavClick("about")}
              className="btn btn-ghost btn-sm hover:bg-base-200 text-base-content"
            >
              About
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavClick("contact")}
              className="btn btn-ghost btn-sm hover:bg-base-200 text-base-content"
            >
              Contact
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/login")}
              className="btn btn-ghost btn-sm hover:bg-base-200 text-base-content"
            >
              Login
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/signup")}
              className="btn btn-primary btn-sm"
            >
              Sign-up
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
