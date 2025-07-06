import { useState, useEffect } from "react";
import { Menu, X, Shield, Sun, Moon, LogOut, Plus } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { clearStore } from "../utils/clearStore";
import { logoutController } from "../controllers/auth/logoutController";
import { useNavigate } from "react-router-dom";
import AddItemForm from "../components/AddItemForm";

export default function Topbar({ drawerOpen, toggleDrawer }) {
  const [theme, setTheme] = useState("light");
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState("subject"); // 🧠 Toggle between "subject" and "questionPaper"
  const profilePic = useSelector((state) => state.auth.profileImage);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleLogout = async () => {
    const response = await logoutController(accessToken);
    if (!response.error) {
      clearStore(dispatch);
      navigate("/login");
    } else {
      console.error("Logout failed:", response.error);
    }
  };

  const openForm = (type) => {
    setFormType(type);  // "subject" or "questionPaper"
    setShowForm(true);
  };

  return (
    <>
      <div className="w-full navbar bg-base-100 shadow px-4">
        <div className="flex-1 flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-md flex items-center justify-center">
            <Shield className="w-5 h-5 text-base-content" />
          </div>
          <span className="text-2xl font-bold text-base-content">EasyAccess</span>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={toggleTheme} className="btn btn-square btn-ghost" aria-label="Toggle theme">
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Add Dropdown */}
          <div className="dropdown dropdown-end">
            <button tabIndex={0} className="btn btn-square btn-ghost" aria-label="Add new">
              <Plus className="w-5 h-5" />
            </button>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-[100]">
              <li><button onClick={() => openForm("subject")}>Add Subject</button></li>
              <li><button onClick={() => openForm("questionPaper")}>Add Question Paper</button></li>
            </ul>
          </div>

          <button onClick={handleLogout} className="btn btn-square btn-ghost" aria-label="Logout">
            <LogOut className="w-5 h-5" />
          </button>

          <div className="avatar">
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={profilePic} alt="Profile" />
            </div>
          </div>

          <button onClick={toggleDrawer} className="btn btn-square btn-ghost lg:hidden" aria-label="Toggle sidebar">
            {drawerOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Render AddItemForm based on selection */}
      {showForm && (
        <AddItemForm
          type={formType} // 🔁 "subject" or "questionPaper"
          onClose={() => setShowForm(false)}
        />
      )}
    </>
  );
}
