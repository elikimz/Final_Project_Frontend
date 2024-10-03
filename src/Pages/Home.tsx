import { Link } from "react-router-dom";
import bmw from '../assets/car2.jpg'; // Ensure this image exists in your assets
import Footer from '../components/footer'; // Footer component
import CarGallery from '../Pages/images'; // CarGallery for displaying images
import Navbar from "../components/navbar";
//import Testimonials from "../components/testimonial";

const Home = () => {
  return (
    <>
      <Navbar />
      <div
        className="min-h-screen flex flex-col justify-center"
        style={{
          backgroundImage: `url(${bmw})`,
          backgroundSize: 'cover', // Ensures the image covers the whole area
          backgroundPosition: 'center', // Centers the image
          backgroundRepeat: 'no-repeat', // Prevents image repetition
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(0, 0, 0, 0.6)', // Overlay for better visibility of content
        }}
      >
        {/* Main Content */}
        <main className="container mx-auto px-8 text-white flex flex-col items-center justify-center flex-grow py-16">
          <h2 className="text-5xl font-extrabold mb-8 text-center">Welcome to the Car Management System</h2>
          <p className="text-xl mb-10 text-center">Manage, track, and maintain your car's data effortlessly.</p>
          <Link
            to="/register"
            className="bg-blue-500 text-white px-8 py-4 rounded-full hover:bg-blue-600 transition duration-300 text-xl"
          >
            Get Started
          </Link>
        </main>
      </div>

      {/* Car Gallery */}
      {/* <section className="py-16 bg-gray-800 bg-opacity-70">
       
      </section> */}
 <CarGallery />
      <Footer />
    </>
  );
};

export default Home;
