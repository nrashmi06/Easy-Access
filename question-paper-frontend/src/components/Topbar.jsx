import { useEffect, useState } from "react";
import { Menu, X, Shield, Sun, Moon, LogOut } from "lucide-react";

export default function Topbar({ drawerOpen, toggleDrawer }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "lemonade";
    const current = saved === "forest" ? "dark" : "light";
    setTheme(current);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    const daisyTheme = newTheme === "dark" ? "forest" : "lemonade";
    setTheme(newTheme);
    localStorage.setItem("theme", daisyTheme);
    document.documentElement.setAttribute("data-theme", daisyTheme);
  };

  const handleLogout = () => {
    // Replace with actual logic
    alert("Logged out!");
  };

  return (
    <div className="w-full navbar bg-base-100 shadow px-4">
      {/* Logo */}
      <div className="flex-1 flex items-center gap-2 cursor-pointer">
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-md flex items-center justify-center">
          <Shield className="w-5 h-5 text-base-content" />
        </div>
        <span className="text-2xl font-bold text-base-content">EasyAccess</span>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="btn btn-square btn-ghost"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="btn btn-square btn-ghost"
          aria-label="Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>

        {/* Profile Avatar */}
        <div className="avatar">
          <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src="/profile.jpg" alt="Profile" />
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleDrawer}
          className="btn btn-square btn-ghost lg:hidden"
          aria-label="Toggle sidebar"
        >
          {drawerOpen ? <X /> : <Menu />}
        </button>
      </div>
    </div>
  );
}
