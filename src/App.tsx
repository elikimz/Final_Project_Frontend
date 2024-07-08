import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home  from './Pages/Home'
import Register from './Pages/Register'
import Error from './Pages/Error'
import Contact from './Pages/Contact'
import Dashboard from './Dashboard/Dashboard'



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
      }
   
   
   
    ]);
    return (
      <RouterProvider router={router} />
    );
}

export default App
