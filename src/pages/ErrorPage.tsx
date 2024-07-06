import React from "react";
import { Link } from "react-router-dom";

const ErrorPage: React.FC = () => {
  return (
    <div className="px-20 py-32 flex flex-col justify-center items-center h-screen">
      <div className="font-bold text-xl">404 - Page Not Found</div>
      <Link
        to={"/"}
        className="py-4 text-blue-500 hover:underline hover:cursor-pointer text-center"
      >
        Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
