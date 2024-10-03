import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "./login.API"; // Adjust the path accordingly
import { CircularProgress } from '@mui/material'; // Make sure to install @mui/material if not already
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error message
  const [mutate, { isLoading }] = useLoginUserMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const result = await mutate({ email, password });
      console.log("API response:", result); // Log the entire API response

      if (result.error) {
        setError("Invalid email or password. Please try again."); // Set error message for incorrect credentials
      } else {
        setError("");
        const { token, user } = result.data; // Extract the token and user from the response

        if (user && user.user) {
          const userData = user.user; // Extract the nested user object
          console.log("Token:", token); // Log the token
          console.log("User object:", userData); // Log the user object

          // Check if all expected properties are present in userData
          if (userData.id && userData.address && userData.contact_phone && userData.full_name) {
            localStorage.setItem("token", token); // Store the token in local storage
            localStorage.setItem("userId", userData.id.toString()); // Store the userId in local storage
            localStorage.setItem("address", userData.address); // Store the address in local storage
            localStorage.setItem("contact_phone", userData.contact_phone); // Store the contact phone in local storage
            localStorage.setItem("email", email || ""); // Store the email in local storage (fallback to provided email)
            localStorage.setItem("full_name", userData.full_name); // Store the full name in local storage
            localStorage.setItem("role", user.role); // Store the role in local storage

            console.log("Login successful", { token, userId: userData.id }); // Log the token and userId for debugging

            // Redirect based on user role
            if (user.role === "admin") {
              navigate("/AdminDashboard");
            } else {
              navigate("/Vehicles");
            }
          } else {
            console.error("User data is incomplete or undefined in the response:", userData);
            setError("User data is incomplete. Please contact support.");
          }
        } else {
          console.error("User object is missing or undefined:", user);
          setError("User object is missing. Please contact support.");
        }

        setEmail(""); // Reset email field
        setPassword(""); // Reset password field
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("Failed to login. Please try again.");
    }
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen flex flex-col">
     
      {/* Login Form Section */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-400 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-primary">Sign in to your account</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#d3ba3c] focus:border-[#d3ba3c] focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#d3ba3c] focus:border-[#d3ba3c] focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#d3ba3c] focus:ring-[#d3ba3c] border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to="#" className="font-medium text-[#d3ba3c] hover:text-[#c3a52f]">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#d3ba3c] hover:bg-[#c3a52f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d3ba3c]"
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Sign in'}
              </button>
            </div>

            {/* Display alert on login failure */}
            {error && (
              <div className="text-red-500 text-center mt-4">
                {error}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Login;
