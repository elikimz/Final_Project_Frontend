import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home  from './Pages/Home'
import Register from './Features/register/Register'
import Error from './Pages/Error'
import Contact from './Pages/Contact'
import Dashboard from './Dashboard/Dashboard'
import About from './Pages/About'
import Login from './Features/login/Login'
import  VehicleDetails from './Pages/Vehicle Details'
import  Booking_form from './Features/Bookings/booking'
import ProfileManagement from './Features/register/Profilemanagement'
import  SpecsForm from './Features/cars_specifications/specForm'
import BookingForm from './Features/Bookings/booking'
import Vehicles from './Features/Vehicles/vehicle'
import CreateLocationForm from './Features/locations/location'
import Users from './Features/users/usersTable'
import AdminDashboard from './Features/AdminDashboard/AdminDashboard'
import VehiclesAdmin from './Features/Vehicles/VehiclesAdmin'
import ManageUsers from './Features/users/ManageUsers'
import CustomerSupportTicketsPage from './Features/customer_support_ticket/customersupport'
import  FleetManagementPage from './Features/FleetManagement/fleet'
import BookingsList from "./Features/Bookings/BookingsQuery"
import SuccessPage from './Pages/sucess'
import AddUserForm from './Features/users/Adduser'
import UserProfile from './Pages/userprofile'
import CurrentBookingsPage from './Pages/booking page'
import BookingHistoryPage from './Pages/Booking history'
import AdminProfile from './Pages/AdminProfile'





  const App: React.FC = () => {
    const router = createBrowserRouter([
      {
        path: '/',
        element: <Home/>,
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
      },
      
      {
        path: 'SpecsForm',
        element: <SpecsForm/>,
        errorElement: <Error />,
      },
      {
        path: 'BookingForm',
        element: <BookingForm/>,
        errorElement: <Error />,
      },
      {
        path: 'vehicles',
        element: <Vehicles/>,
        errorElement: <Error />,
      },
      {
        path: 'CreateLocationForm',
        element: <CreateLocationForm/>,
        errorElement: <Error />,
      },
      {
        path: 'users',
        element: <Users/>,
        errorElement: <Error />,
      },
      {
        path: 'AdminDashboard',
        element: <AdminDashboard/>,
        errorElement: <Error />,
      },
      {
        path: 'VehiclesAdmin',
        element: <VehiclesAdmin/>,
        errorElement: <Error />,
      },
      {
        path: 'ManageUsers',
        element: < ManageUsers/>,
        errorElement: <Error />,
      },
      {
        path: 'CustomerSupportTicketsPage',
        element: <CustomerSupportTicketsPage/>,
        errorElement: <Error />,
      },
      {
        path: 'FleetManagementPage',
        element: <FleetManagementPage/>,
        errorElement: <Error />,
      },
      {
        path: 'BookingsList',
        element: <BookingsList/>,
        errorElement: <Error />,
      },
      {
        path: 'SuccessPage',
        element: <SuccessPage/>,
        errorElement: <Error />,
      },
      {
        path: 'AddUserForm',
        element: <AddUserForm onUserAdded={() => console.log('User added')} />,
        errorElement: <Error />,
      },
      {
        path: 'UserProfile',
        element: <UserProfile/>,
        errorElement: <Error />,
      },
      {
        path: 'CurrentBookingsPage',
        element: <CurrentBookingsPage/>,
        errorElement: <Error />,
      },
      {
        path: 'BookingHistoryPage',
        element: <BookingHistoryPage/>,
        errorElement: <Error />,
      },
      {
        path: 'AdminProfile',
        element: <AdminProfile/>,
        errorElement: <Error />,
      },
      
      
      
      
   
     
      
      
      
      
      
     


   
   
        
   
   
   
   
   
   
      
   
   
    ]);
    return (
      <RouterProvider router={router} />
    );
}

export default App
