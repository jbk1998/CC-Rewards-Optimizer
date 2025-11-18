import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm p-4 sticky top-0 z-10 border-b border-gray-700">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-white">
          <span className="text-blue-400">CC Rewards</span> Optimizer
        </h1>
        <p className="text-sm text-gray-400">Maximize your credit card rewards</p>
      </div>
    </header>
  );
};

export default Header;