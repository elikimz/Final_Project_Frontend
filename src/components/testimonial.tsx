// src/components/Testimonials.tsx
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
      <div className="flex flex-wrap justify-center space-x-4 space-y-4">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-lg w-64">
            <img
              src={testimonial.photo}
              alt={testimonial.name}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <p className="text-lg font-semibold text-center">{testimonial.name}</p>
            <p className="text-gray-600 text-center mt-2">{testimonial.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
