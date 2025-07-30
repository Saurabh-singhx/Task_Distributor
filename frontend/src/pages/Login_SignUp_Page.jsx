import React, { useState } from 'react';
import { Mail, Lock, User, Eye, LogIn, Shield } from 'lucide-react';
import toast from 'react-hot-toast';
import { authStore } from '../store/authStore';

 function Login_SignUp_Page() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('user'); // 'user' or 'admin'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { adminLogin, agentLogin, isLoggingIn } = authStore();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      return toast.error('Email and password are required.');
    }

    if (!validateEmail(email)) {
      return toast.error('Please enter a valid email address.');
    }

    if (role === 'user') {
      await agentLogin(formData);
    } else {
      await adminLogin(formData);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-400 px-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden">

        {/* Role Switch Tabs */}
        <div className="flex">
          <button
            onClick={() => setRole('user')}
            className={`flex-1 py-4 flex items-center justify-center gap-2 text-gray-500 font-medium transition ${
              role === 'user' ? 'bg-white' : 'bg-gray-100'
            }`}
          >
            <User size={18} className="text-sky-400" />
            User
          </button>
          <button
            onClick={() => setRole('admin')}
            className={`flex-1 py-4 flex items-center justify-center gap-2 text-gray-500 font-medium transition ${
              role === 'admin' ? 'bg-white' : 'bg-gray-100'
            }`}
          >
            <Shield size={18} className="text-sky-400" />
            Admin
          </button>
        </div>

        {/* Avatar */}
        <div className="flex justify-center py-6">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
            {role === 'admin' ? (
              <Shield size={40} className="text-sky-400" />
            ) : (
              <User size={40} className="text-sky-400" />
            )}
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-5">
          {/* Email */}
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center text-sky-400">
              <Mail size={18} />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 text-sm outline-none"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center text-sky-400">
              <Lock size={18} />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full pl-10 pr-10 py-2 rounded-full bg-gray-100 text-sm outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-sky-400"
            >
              <Eye size={18} />
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoggingIn}
            className={`w-full py-2 rounded-full font-semibold transition ${
              isLoggingIn
                ? 'bg-sky-300 cursor-not-allowed text-white'
                : 'bg-sky-400 hover:bg-sky-500 text-white'
            }`}
          >
            {isLoggingIn ? 'Logging in...' : `Login as ${role === 'admin' ? 'Admin' : 'User'}`}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login_SignUp_Page;