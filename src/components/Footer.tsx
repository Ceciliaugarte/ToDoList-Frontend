import React from "react";
import backgroundImage from "../assets/bg.avif";

const Footer: React.FC = () => {
  return (
    <div
      className="py-4 px-4 flex justify-end bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      To Do List © All rights reserved
    </div>
  );
};

export default Footer;
