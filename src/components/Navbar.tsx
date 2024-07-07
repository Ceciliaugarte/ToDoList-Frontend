import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogOut } from "../Redux/reducers/userReducer";
import backgroundImage from "../assets/bg.avif";

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const manageLogout = () => {
    dispatch(LogOut());
    navigate("/login");
  };

  return (
    <div
      className="bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="flex justify-between bg-black bg-opacity-20 py-4 px-6">
        <Link to="/" className="font-bold font-mono text-3xl text-zinc-200">
          TO DO LIST
        </Link>
        <button className="text-lg hover:underline" onClick={manageLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
