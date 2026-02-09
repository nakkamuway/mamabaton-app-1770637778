import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { GraduationCap, Menu, X } from 'lucide-react';
import Footer from './Footer';

const Layout: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'text-primary-600' : 'text-gray-600 hover:text-primary-600';
  };

  const menuItems = [
    { path: '/flow', label: 'ご利用の流れ' },
    { path: '/find-teacher', label: '先生を探す' },
    { path: '/pricing', label: '料金プラン' },
    { path: '/become-teacher', label: '先生になる' },
    { path: '/login', label: 'ログイン' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white flex flex-col">
      <header className="bg-white shadow-sm relative z-50">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-800">MamaBaton</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {menuItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={isActive(item.path)}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-600 hover:text-primary-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`
              md:hidden absolute left-0 right-0 top-full bg-white border-t border-gray-100 shadow-lg
              transition-all duration-300 ease-in-out
              ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
            `}
          >
            <div className="container mx-auto px-6 py-4 space-y-4">
              {menuItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block ${isActive(item.path)}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;