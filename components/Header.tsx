
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex items-center space-x-3 mb-8">
      <div className="bg-indigo-600 text-white p-2.5 rounded-2xl shadow-lg shadow-indigo-200">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        </svg>
      </div>
      <div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight">
          AnalogAI
        </h1>
        <p className="text-sm font-medium text-slate-500">Your Smarter Teaching Assistant</p>
      </div>
    </header>
  );
};

export default Header;
