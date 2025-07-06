// src/pages/ResetPassword.jsx
import React, { useState } from 'react';
/** @typedef {import('@/types/auth').ResetPasswordData} ResetPasswordData */
import { handleResetPassword } from "../controllers/auth/resetPasswordController.js";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

/**
 * @returns {JSX.Element}
 */
export default function ResetPassword() {
  const [formData, setFormData] = useState({
    token: '',
    newPassword: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    /** @type {import('@/types/auth').ResetPasswordData} */
    const data = {
      token: formData.token,
      newPassword: formData.newPassword,
    };

    handleResetPassword(data)
      .then((response) => {
        if (response.success) {
          alert('Password reset successful!');
          navigate('/login');
        } else {
          alert(`Error: ${response.error || response.message}`);
        }
      });
  };

  return (
    <> 
    <Navbar />
    <div className="flex justify-center items-center min-h-screen bg-base-200 px-4">
     
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Token</span>
              </label>
              <input
                type="text"
                name="token"
                value={formData.token}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Enter token"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">New Password</span>
              </label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Enter new password"
                required
              />
            </div>

            <div className="form-control mt-8">
              <button type="submit" className="btn btn-primary w-full">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}