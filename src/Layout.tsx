import React from "react";
import { Outlet } from "react-router-dom";
import backgroundImage from "./assets/bg.avif";

const Layout: React.FC = () => {
  return (
    <>
      <div
        className="bg-cover bg-center min-h-screen"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
