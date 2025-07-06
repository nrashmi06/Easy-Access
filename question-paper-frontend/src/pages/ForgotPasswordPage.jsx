import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { forgotPasswordController } from "../controllers/auth/forgotPasswordController.js"; // Adjust the import path as needed

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reset password request for:", email);

    // Call the controller function to handle the forgot password logic
    forgotPasswordController({ email })
      .then((response) => {
        if (response.success) {
          alert("Reset link sent to your email!");
          navigate("/reset-password"); // Redirect to reset password page after successful request
        } else {
          console.error("Forgot password request failed:", response.error);
        }
      })
      .catch((error) => {
        console.error("Error occurred while handling forgot password:", error);
      });
  };

  return (
    <div className="flex flex-col min-h-screen w-screen">
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-4 py-8 bg-gradient-to-br from-base-200 via-base-300 to-base-200 relative overflow-hidden">
        {/* Background blur blobs */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        </div>

        <div className="w-full max-w-md relative z-10">
          <div className="card bg-base-100/80 backdrop-blur-sm shadow-2xl border border-base-300/50">
            <div className="card-body p-8">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                  Forgot Your Password?
                </h2>
                <p className="text-base-content/70 text-sm">
                  We'll send you instructions to reset it
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div className="form-control">
                  <label className="label pb-2">
                    <span className="label-text text-base-content font-medium">Email Address</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="input input-bordered w-full py-3 text-base"
                  />
                </div>

                {/* Submit */}
                <div className="form-control pt-4">
                  <button type="submit" className="btn btn-primary w-full py-3 text-base font-semibold hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl">
                    Send Reset Link
                  </button>
                </div>
              </form>

              {/* Link to login */}
              <div className="text-center pt-6 border-t border-base-300/50">
                <p className="text-sm text-base-content/70">
                  Remembered your password?{" "}
                  <a href="/login" className="link link-primary font-semibold hover:link-hover">
                    Sign in
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-6 text-xs text-base-content/50">
            <p>📧 Reset link will be sent to your registered email</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
