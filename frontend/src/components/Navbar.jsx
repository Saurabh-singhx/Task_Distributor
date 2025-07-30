import React from 'react';
import { LogOut, User, Shield, Menu } from 'lucide-react';
import { authStore } from '../store/authStore';

function Navbar({ role = 'user' }) {
  const { logout, userData } = authStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-white shadow-sm px-6 py-3 flex items-center justify-between">
      {/* Left: Greeting */}
      <div className="flex items-center gap-3 text-sky-600 font-medium text-lg">
        <Menu className="w-5 h-5 text-sky-600" />
        <span>
          Hello <span className="font-semibold">{userData?.user?.fullName || 'User'}</span> 👋
        </span>
      </div>

      {/* Center: Role Info (Hidden on mobile) */}
      <div className="hidden md:flex items-center gap-2 text-gray-600">
        {role === 'admin' ? (
          <>
            <Shield className="h-5 w-5 text-sky-500" />
            <span className="text-sm font-medium">Admin Panel</span>
          </>
        ) : (
          <>
            <User className="h-5 w-5 text-sky-500" />
            <span className="text-sm font-medium">Agent Dashboard</span>
          </>
        )}
      </div>

      {/* Right: Avatar + Logout */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full bg-sky-100">
          {role === 'admin' ? (
            <Shield size={18} className="text-sky-600" />
          ) : (
            <User size={18} className="text-sky-600" />
          )}
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-red-500 text-sm font-medium hover:underline"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
