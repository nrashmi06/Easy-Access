// @ts-check
/** @typedef {import("../types/auth.js").SigninFormData} SigninFormData */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { handleLogin } from "../controllers/auth/loginController.js";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice"; // ✅ adjust the path if needed


export default function LoginPage() {
  /** @type {[SigninFormData, React.Dispatch<React.SetStateAction<SigninFormData>>]} */
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();


  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const res = await handleLogin(form);

  if (res.success) {
    alert(res.message);
    console.log("✅ Login successful:", res.data);

     dispatch(setUser(res.data));

    navigate("/dashboard");
  } else {
    alert(`❌ ${res.message}`);
    console.error("Login error:", res.error);
  }
};

  return (
    <div className="flex flex-col min-h-screen w-screen">
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-4 py-8 bg-gradient-to-br from-base-200 via-base-300 to-base-200 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        </div>

        <div className="w-full max-w-md relative z-10">
          <div className="card bg-base-100/80 backdrop-blur-sm shadow-2xl border border-base-300/50 hover:shadow-3xl transition-all duration-300">
            <div className="card-body p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                  Welcome Back
                </h2>
                <p className="text-base-content/70 text-sm">
                  Sign in to continue to your account
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Email Field */}
                <div className="form-control">
                  <label className="label pb-2">
                    <span className="label-text text-base-content font-medium">Email Address</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="input input-bordered w-full pr-4 pl-4 py-3 text-base focus:input-primary transition-all duration-200 hover:border-primary/50"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="form-control">
                  <label className="label pb-2">
                    <span className="label-text text-base-content font-medium">Password</span>
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="input input-bordered w-full pr-4 pl-4 py-3 text-base focus:input-primary transition-all duration-200 hover:border-primary/50"
                      required
                    />
                  </div>
                </div>

                {/* Login Button */}
                <div className="form-control pt-2">
                  <button
                    type="submit"
                    className="btn btn-primary w-full py-3 text-base font-semibold hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                    Sign In
                  </button>
                </div>
              </form>

              <div className="divider my-1 text-base-content/50"></div>

              <div className="flex items-center justify-center">
                <a href="/forgot-password" className="link link-primary text-sm font-medium hover:link-hover transition-colors">
                  Forgot password?
                </a>
              </div>

              <div className="text-center pt-1 border-t border-base-300/50">
                <p className="text-sm text-base-content/70">
                  New to our platform?{" "}
                  <a href="/signup" className="link link-primary font-semibold hover:link-hover transition-colors">
                    Create an account
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-6 text-xs text-base-content/50">
            <p>🔒 Your information is secure and encrypted</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
