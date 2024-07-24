import { Link } from "react-router-dom";

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
      image: "data:image/jpeg;base64,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"
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
    <div className="min-h-screen flex flex-col">
      <header className="w-full py-4 bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-800">KimExpress Car Hire</div>
          <nav>
            <ul className="flex space-x-6">
              <li><Link to="/" className="text-gray-800 hover:text-gray-600">Home</Link></li>
              <li><Link to="/about" className="text-gray-800 hover:text-gray-600">About</Link></li>
              <li><Link to="/contact" className="text-gray-800 hover:text-gray-600">Contact</Link></li>
              <li><Link to="/register" className="text-gray-800 hover:text-gray-600">Register</Link></li>
            </ul>
          </nav>
        </div>
      </header>

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

        <div className="flex justify-center">
          <Link to="/contact">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Contact Us
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
