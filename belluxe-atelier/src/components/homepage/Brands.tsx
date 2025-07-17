import React from 'react';

const Brands = () => {
  const brands = [
    {
      id: 1,
      name: 'Brand A',
      logoUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Brand B',
      logoUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      name: 'Brand C',
      logoUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 4,
      name: 'Brand D',
      logoUrl: 'https://via.placeholder.com/150',
    },
  ];

  return (
    <section className="brands-section">
      <h2 className="text-2xl font-bold mb-4">Our Brands</h2>
      <div className="flex flex-wrap">
        {brands.map((brand) => (
          <div key={brand.id} className="brand-item p-4">
            <img src={brand.logoUrl} alt={brand.name} className="brand-logo" />
            <h3 className="brand-name text-lg">{brand.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Brands;