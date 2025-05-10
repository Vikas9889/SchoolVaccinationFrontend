import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { saveAs } from 'file-saver';

const Navbar = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Add sign-out logic here
    navigate("/"); // Redirect to login page
  };

  const handleDownloadReport = async () => {
    try {
      console.log('Download report triggered');
      const response = await fetch('http://localhost:3005/api/drives/v1/vaccination-reports');
      console.log('API response received:', response);
      const data = await response.json();
      console.log('Data processed:', data);

      const csvContent = [
        ['Total Students', 'Vaccinated Students', 'Vaccination Percentage', 'Upcoming Drives Count'],
        [
          data.totalStudents,
          data.vaccinatedStudents,
          data.vaccinationPercentage,
          data.upcomingDrivesCount,
        ],
      ]
        .map((row) => row.join(','))
        .join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, 'vaccination_report.csv');
      console.log('CSV file saved successfully');
    } catch (error) {
      console.error('Error downloading report:', error);
    }
  };

  return (
    <nav className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
      <div className="flex space-x-4">
        <Link to="/dashboard" className="hover:underline">Home</Link>
        <Link to="/manage-students" className="hover:underline text-yellow-300">Manage Students</Link>
        <Link to="/vaccination-drives" className="hover:underline">Vaccination Drives</Link>
        <Link to="#" onClick={handleDownloadReport} className="hover:underline">Reports</Link>
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
