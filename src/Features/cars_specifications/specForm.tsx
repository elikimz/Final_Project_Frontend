import React, { useState } from 'react';
import { useCreateSpecificationsMutation } from './spectAPI'; // Adjust import path as needed

const VehicleSpecificationsForm = () => {
  const [formData, setFormData] = useState({
    manufacturer: '',
    model: '',
    year: 0,
    fuel_type: '',
    engine_capacity: '',
    transmission: '',
    seating_capacity: 0,
    color: '',
    features: ''
  });

  const [createSpecifications] = useCreateSpecificationsMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createSpecifications(formData).unwrap();
      console.log('Specification created successfully:', formData);
      setFormData({
        manufacturer: '',
        model: '',
        year: 0,
        fuel_type: '',
        engine_capacity: '',
        transmission: '',
        seating_capacity: 0,
        color: '',
        features: ''
      });
    } catch (err) {
      console.error('Failed to save specification:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-500">Vehicle Specifications Form</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="manufacturer">
              Manufacturer
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="manufacturer"
              type="text"
              placeholder="Manufacturer"
              name="manufacturer"
              value={formData.manufacturer}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="model">
              Model
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="model"
              type="text"
              placeholder="Model"
              name="model"
              value={formData.model}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="year">
              Year
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="year"
              type="number"
              placeholder="Year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fuel_type">
              Fuel Type
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="fuel_type"
              type="text"
              placeholder="Fuel Type"
              name="fuel_type"
              value={formData.fuel_type}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="engine_capacity">
              Engine Capacity
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="engine_capacity"
              type="text"
              placeholder="Engine Capacity"
              name="engine_capacity"
              value={formData.engine_capacity}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="transmission">
              Transmission
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="transmission"
              type="text"
              placeholder="Transmission"
              name="transmission"
              value={formData.transmission}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="seating_capacity">
              Seating Capacity
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="seating_capacity"
              type="number"
              placeholder="Seating Capacity"
              name="seating_capacity"
              value={formData.seating_capacity}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="color">
              Color
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="color"
              type="text"
              placeholder="Color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="features">
            Features
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="features"
            placeholder="Features"
            name="features"
            value={formData.features}
            onChange={handleChange}
            rows={4}
            required
          />
        </div>
        <div className="flex items-center justify-center space-x-4 mt-6">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create Specifications
          </button>
        </div>
      </form>
    </div>
  );
};

export default VehicleSpecificationsForm;
