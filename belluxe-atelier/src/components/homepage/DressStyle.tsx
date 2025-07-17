import React from 'react';

const DressStyle: React.FC = () => {
  return (
    <section className="dress-style-section">
      <h2 className="text-2xl font-bold mb-4">Dress Styles</h2>
      <div className="dress-style-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Example dress style items */}
        <div className="dress-style-item border p-4 rounded">
          <img src="https://via.placeholder.com/150" alt="Dress Style 1" className="w-full h-auto mb-2" />
          <h3 className="font-semibold">Elegant Evening Dress</h3>
          <p className="text-gray-600">Perfect for formal occasions.</p>
        </div>
        <div className="dress-style-item border p-4 rounded">
          <img src="https://via.placeholder.com/150" alt="Dress Style 2" className="w-full h-auto mb-2" />
          <h3 className="font-semibold">Casual Summer Dress</h3>
          <p className="text-gray-600">Light and breezy for summer days.</p>
        </div>
        <div className="dress-style-item border p-4 rounded">
          <img src="https://via.placeholder.com/150" alt="Dress Style 3" className="w-full h-auto mb-2" />
          <h3 className="font-semibold">Chic Office Dress</h3>
          <p className="text-gray-600">Stylish and professional for the workplace.</p>
        </div>
      </div>
    </section>
  );
};

export default DressStyle;