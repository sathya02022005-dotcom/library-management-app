
import React from 'react';
import { User } from '../types';
import { BookOpen, User as UserIcon, LogOut, Menu } from 'lucide-react';

interface NavbarProps {
  user: User;
  onLoginClick: () => void;
  onSignupClick: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLoginClick, onSignupClick, onLogout }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-amber-500 p-2 rounded-lg">
            <BookOpen className="text-slate-900" size={24} />
          </div>
          <span className="text-2xl font-serif font-bold tracking-tight text-white">Lumina<span className="text-amber-500">Library</span></span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="hover:text-amber-500 transition-colors">Home</a>
          <a href="#catalog" className="hover:text-amber-500 transition-colors">Catalog</a>
          <a href="#about" className="hover:text-amber-500 transition-colors">About</a>
        </div>

        <div className="flex items-center gap-4">
          {user.isLoggedIn ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                <UserIcon size={18} className="text-amber-500" />
                <span className="text-sm font-medium">{user.name}</span>
              </div>
              <button 
                onClick={onLogout}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <>
              <button 
                onClick={onLoginClick}
                className="px-5 py-2 text-sm font-medium hover:text-amber-500 transition-colors"
              >
                Sign In
              </button>
              <button 
                onClick={onSignupClick}
                className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-full transition-all transform hover:scale-105 active:scale-95 text-sm"
              >
                Join Now
              </button>
            </>
          )}
          <button className="md:hidden p-2 text-white">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
