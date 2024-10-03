import React from 'react';

const cars = [
  {
    name: 'Sleek and Modern Sedan',
    image: 'https://www.motorhub.co.ke/assets/images/CarPhotos/Large_6abec6e3af8b8a5be4d9c3a99474343b_08072024123049.JPG',
    description: 'A sleek and modern car with advanced features and a stylish design.',
  },
  {
    name: 'Compact City Car',
    image: 'https://www.motorhub.co.ke/assets/images/CarPhotos/Large_f19e4b9e74f9480f11cf5cad19f525b2_08072024123050.JPG',
    description: 'A compact and efficient vehicle perfect for city driving.',
  },
  {
    name: 'All-Terrain Adventure SUV',
    image: 'https://www.motorhub.co.ke/assets/images/trade-carr.jpg',
    description: 'An all-terrain vehicle designed for both urban and off-road adventures.',
  },
  {
    name: 'Luxury Comfort Sedan',
    image: 'https://www.motorhub.co.ke/assets/images/CarPhotos/Large_976ab61505527aaf2a7e52138ce34429_08072024123050.JPG',
    description: 'A luxury sedan offering comfort and high-end features.',
  },
  {
    name: 'Sporty Performance Coupe',
    image: 'https://www.motorhub.co.ke/assets/images/CarPhotos/Large_bb60e63fb664a55e09f4b4a2d61fabb0_08072024124217.JPG',
    description: 'A sporty coupe with a powerful engine and dynamic handling.',
  },
  {
    name: 'Versatile Luxury SUV',
    image: 'https://www.motorhub.co.ke/assets/images/CarPhotos/Large_54c996fa1b178bfe0332c69abcea8aea_08072024124218.JPG',
    description: 'A versatile SUV that combines luxury with practicality.',
  },
  // Add more car objects as needed
];

const CarGallery: React.FC = () => {
  return (
    <section className="py-30 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Cars</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 transform hover:scale-105"
            >
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-48 object-contain bg-gray-200" // Ensures the whole image fits
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">{car.name}</h3>
                <p className="text-gray-600 text-sm">{car.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarGallery;
