import { Link, useRouteError } from "react-router-dom";
import { ArrowLeft } from 'lucide-react';

function Error() {
  const error = useRouteError() as { statusText?: string; message?: string };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="p-8 bg-white rounded-lg shadow-lg text-center animate-fade-in">
        <p className="text-4xl font-extrabold text-red-500">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-800 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 text-lg leading-7 text-gray-600">
          Sorry, we couldn't find the page you're looking for.
        </p>
        {error.statusText || error.message ? (
          <p className="mt-2 text-sm text-gray-500">
            {error.statusText || error.message}
          </p>
        ) : null}
        <div className="mt-6 flex items-center justify-center gap-x-4">
          <Link to="/" className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105">
            <ArrowLeft size={20} className="mr-2" />
            Go back
          </Link>
          <Link to="/" className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-green-500 rounded-md shadow-md hover:bg-green-600 transition-transform transform hover:scale-105">
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Error;
