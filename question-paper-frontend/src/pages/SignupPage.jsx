// @ts-check
/** @typedef {import("../types/auth").SignupFormData} SignupFormData */


import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { handleSignup } from "../controllers/auth/registerController.js";

export default function SignupPage() {
  /** @type {[SignupFormData, Function]} */
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    profile: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: name === "profile" ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // For now, just log the form data
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("password", form.password);
    if (form.profile) formData.append("profile", form.profile);

    console.log("profile file:", form.profile);

    console.log("FormData to send:", Object.fromEntries(formData.entries()));
    handleSignup(formData)
      .then((res) => {  
        if (res.success) {
          alert(res.message);
          console.log("✅ Signup successful:", res.data);
          // Optionally: window.location.href = "/login";
        } else {
          alert(`❌ ${res.message}`);
          console.error("Signup error:", res.error);
        }
      })
    // You'd replace the above with a fetch() or axios() call to your API
  };

  return (
    <div className="flex flex-col min-h-screen w-screen">
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-4 py-8 bg-gradient-to-br from-base-200 via-base-300 to-base-200 relative overflow-hidden">
        {/* Background blur decorations */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        </div>

        <div className="w-full max-w-md relative z-10">
          <div className="card bg-base-100/80 backdrop-blur-sm shadow-2xl border border-base-300/50">
            <div className="card-body p-8">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                  Create an Account
                </h2>
                <p className="text-base-content/70 text-sm">
                  Join and get access instantly
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Name */}
                <div className="form-control">
                  <label className="label pb-2">
                    <span className="label-text text-base-content font-medium">Full Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="input input-bordered w-full py-3 text-base"
                  />
                </div>

                {/* Email */}
                <div className="form-control">
                  <label className="label pb-2">
                    <span className="label-text text-base-content font-medium">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="input input-bordered w-full py-3 text-base"
                  />
                </div>

                {/* Password */}
                <div className="form-control">
                  <label className="label pb-2">
                    <span className="label-text text-base-content font-medium">Password</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="input input-bordered w-full py-3 text-base"
                  />
                </div>

                {/* Profile Picture */}
                <div className="form-control">
                  <label className="label pb-2">
                    <span className="label-text text-base-content font-medium">Profile Picture</span>
                  </label>
                  <input
                    type="file"
                    name="profile"
                    accept="image/*"
                    onChange={handleChange}
                    className="file-input file-input-bordered w-full"
                  />
                </div>

                {/* Submit */}
                <div className="form-control pt-4">
                  <button
                    type="submit"
                    className="btn btn-primary w-full py-3 text-base font-semibold hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Sign Up
                  </button>
                </div>
              </form>

              {/* Sign-in link */}
              <div className="text-center pt-6 border-t border-base-300/50">
                <p className="text-sm text-base-content/70">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="link link-primary font-semibold hover:link-hover"
                  >
                    Sign in
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Trust Indicator */}
          <div className="text-center mt-6 text-xs text-base-content/50">
            <p>🔒 We respect your privacy and never share your data</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
