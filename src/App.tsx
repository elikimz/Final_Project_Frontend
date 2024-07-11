import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home  from './Pages/Home'
import Register from './Pages/Register'
import Error from './Pages/Error'
import Contact from './Pages/Contact'
import Dashboard from './Dashboard/Dashboard'
import About from './Pages/About'
import Login from './Pages/Login'
import Book from './Pages/Book Now'
import  VehicleDetails from './Pages/Vehicle Details'
import  Booking_form from './Pages/Booking Form'
import ProfileManagement from './Features/register/Profilemanagement'



  const App: React.FC = () => {
    const router = createBrowserRouter([
      {
        path: '/',
        element: <Home />,
        errorElement: <Error />,
      },
      {
        path: 'register',
        element: <Register />,
        errorElement: <Error />,
      },
      {
        path: 'Contact',
        element: <Contact />,
        errorElement: <Error />,
      },
      {
        path: 'Dashboard',
        element: <Dashboard />,
        errorElement: <Error />,
      },
      {
        path: 'About',
        element: <About />,
        errorElement: <Error />,
      },

      {
        path: 'Login',
        element: <Login />,
        errorElement: <Error />,
      },
      
      {
        path: 'Book Now',
        element: <Book />,
        errorElement: <Error />,
      },

      {
        path: 'vehicle_details',
        element: <VehicleDetails />,
        errorElement: <Error />,
      },
      {
        path: 'Booking_Form',
        element: <Booking_form />,
        errorElement: <Error />,
      },
      {
        path: 'profilemanagement',
        element: <ProfileManagement/>,
        errorElement: <Error />,
      }
   
   
   
   
   
   
   
   
      
   
   
    ]);
    return (
      <RouterProvider router={router} />
    );
}

export default App
