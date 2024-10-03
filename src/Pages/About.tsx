//import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";


const About = () => {
  const cars = [
    {
      name: "Compact Car",
      description: "Perfect for city travel, offering great fuel efficiency.",
      color: "bg-blue-100",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBIIKxhsqNeMpPJJfp2WDfPZeebNk1JkJGZczfade4PgCYlc1riWVaItvMKVUTXpkT4Dg&usqp=CAU"
    },
    {
      name: "SUV",
      description: "Spacious and comfortable, ideal for family trips.",
      color: "bg-green-100",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXZRuRZgln1hZs0Z8eWey-xrQx5t0MMCkYyw&s"
    },
    {
      name: "Luxury Sedan",
      description: "Travel in style with our luxurious sedans.",
      color: "bg-purple-100",
      image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/"
    }
  ];

  const achievements = [
    {
      title: "Customer Satisfaction Award",
      description: "Recognized for outstanding customer service.",
      icon: "🏆"
    },
    {
      title: "Fleet Excellence Award",
      description: "Awarded for maintaining a top-quality vehicle fleet.",
      icon: "🚗"
    },
    {
      title: "Best Pricing",
      description: "Consistently offering competitive prices.",
      icon: "💰"
    }
  ];

  return (

    <>
    <Navbar />
    <div className="min-h-screen flex flex-col pg-gray-100">
  
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">About Our Car Hire Service</h2>
        <p className="text-gray-700 mb-6">
          We are dedicated to providing you with the best car rental experience. Our fleet offers a diverse selection of vehicles, from compact cars to luxurious SUVs, ensuring we meet your transportation needs for any occasion.
        </p>
        <p className="text-gray-700 mb-6">
          At our core, we prioritize customer satisfaction and convenience. Whether you're traveling for business or pleasure, our user-friendly booking system and flexible rental options make it easy to find and reserve the perfect vehicle.
        </p>
        <p className="text-gray-700 mb-6">
          Our commitment to quality extends beyond our vehicles. We offer competitive pricing, transparent terms, and exceptional customer support to ensure your rental experience is seamless from start to finish.
        </p>
        <p className="text-gray-700 mb-6">
          Discover why thousands of customers choose us for their car rental needs. Contact us today to learn more about our services and let us help you make your journey memorable.
        </p>
        
        {/* Cars Section */}
        <div className="my-10">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Our Cars</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cars.map((car, index) => (
              <div key={index} className={`p-6 rounded-lg shadow-md ${car.color}`}>
                <img src={car.image} alt={car.name} className="w-full h-40 object-cover rounded mb-4" />
                <h4 className="text-xl font-bold text-gray-800 mb-2">{car.name}</h4>
                <p className="text-gray-700">{car.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Section */}
        <div className="my-10">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Our Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="p-6 bg-white rounded-lg shadow-md">
                <div className="text-4xl mb-4">{achievement.icon}</div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">{achievement.title}</h4>
                <p className="text-gray-700">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default About;
