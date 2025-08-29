import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-base-200">
      <h1 className="text-6xl font-bold text-error mb-4">404</h1>
      <p className="text-xl mb-6">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Link to="/" className="btn btn-primary">
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;
