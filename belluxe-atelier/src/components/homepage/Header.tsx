import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Belluxe Atelier</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="/" className="text-gray-700 hover:text-gray-900">Home</a></li>
            <li><a href="/shop" className="text-gray-700 hover:text-gray-900">Shop</a></li>
            <li><a href="/about" className="text-gray-700 hover:text-gray-900">About</a></li>
            <li><a href="/contact" className="text-gray-700 hover:text-gray-900">Contact</a></li>
            <li><a href="/admin" className="text-gray-700 hover:text-gray-900">Admin</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;