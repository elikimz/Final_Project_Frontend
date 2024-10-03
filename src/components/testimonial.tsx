import React from 'react';

interface Testimonial {
  name: string;
  message: string;
  photo: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'John Doe',
    message: 'Great service and friendly staff!',
    photo: 'https://images.unsplash.com/photo-1524503033411-c9566986fc8f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
  },
  {
    name: 'Jane Smith',
    message: 'I had a wonderful experience renting a car from here.',
    photo: 'https://images.unsplash.com/photo-1594700759371-a1b92e0b19e4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
  },
  {
    name: 'Emily Johnson',
    message: 'The car was in excellent condition and the process was smooth.',
    photo: 'https://images.unsplash.com/photo-1584892871660-5d0d7ed0bbd8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'
  }
];

const Testimonials: React.FC = () => {
  return (
    <div className="bg-gray-100 p-8">
      <h2 className="text-2xl font-bold text-center mb-6">What Our Customers Say</h2>
      <div className="flex flex-wrap justify-center gap-4"> {/* Reduced gap between testimonials */}
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md w-56 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg" // Smaller width and padding
          >
            <img
              src={testimonial.photo}
              alt={testimonial.name}
              className="w-20 h-20 rounded-full mx-auto mb-3 shadow-md" // Smaller image size
            />
            <p className="text-md font-semibold text-center">{testimonial.name}</p>
            <p className="text-gray-600 text-center text-sm mt-1">{testimonial.message}</p> {/* Smaller text size */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
