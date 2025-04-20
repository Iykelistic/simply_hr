import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

/**
 * Application header with navigation
 */
const Header: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  
  return (
    <header className="bg-indigo-600">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold text-xl">
              Transaction Dashboard
            </Link>
            <div className="hidden ml-10 space-x-8 lg:block">
              <Link
                to="/"
                className={`text-base font-medium ${
                  location.pathname === '/' ? 'text-white' : 'text-indigo-200 hover:text-white'
                }`}
              >
                Transactions
              </Link>
              <Link
                to="/new"
                className={`text-base font-medium ${
                  location.pathname === '/new' ? 'text-white' : 'text-indigo-200 hover:text-white'
                }`}
              >
                New Transaction
              </Link>
            </div>
          </div>
          <div className="ml-10 space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center">
                <span className="text-indigo-200 mr-4">
                  Welcome, {user?.name || 'User'}
                </span>
                <button
                  onClick={logout}
                  className="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50"
              >
                Login
              </Link>
            )}
          </div>
        </div>
        <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
          <Link
            to="/"
            className={`text-base font-medium ${
              location.pathname === '/' ? 'text-white' : 'text-indigo-200 hover:text-white'
            }`}
          >
            Transactions
          </Link>
          <Link
            to="/new"
            className={`text-base font-medium ${
              location.pathname === '/new' ? 'text-white' : 'text-indigo-200 hover:text-white'
            }`}
          >
            New Transaction
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;

