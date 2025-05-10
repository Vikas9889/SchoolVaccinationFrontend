import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Add sign-out logic here
    navigate("/"); // Redirect to login page
  };

  return (
    <nav className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
      <div className="flex space-x-4">
        <Link to="/dashboard" className="hover:underline">Home</Link>
        <Link to="/manage-students" className="hover:underline text-yellow-300">Manage Students</Link>
        <Link to="/vaccination-drives" className="hover:underline">Vaccination Drives</Link>
        <Link to="/reports" className="hover:underline">Reports</Link>
      </div>
      <button
        onClick={handleSignOut}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
      >
        Sign Out
      </button>
    </nav>
  );
};

export default Navbar;
