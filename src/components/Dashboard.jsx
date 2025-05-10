import React from "react";
import Navbar from "./Navbar";

const Dashboard = () => {
    const totalStudents = 500;
    const vaccinated = 375;
    const vaccinationPercentage = ((vaccinated / totalStudents) * 100).toFixed(1);

    const upcomingDrives = [
        { name: "Drive A", vaccine: "Covishield", date: "2025-05-15" },
        { name: "Drive B", vaccine: "Covaxin", date: "2025-05-22" },
        { name: "Drive C", vaccine: "Pfizer", date: "2025-06-01" },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="p-6">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Vaccination Dashboard</h1>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white shadow-md rounded-xl p-6 text-center">
                        <h2 className="text-xl font-semibold text-gray-600">Total Students</h2>
                        <p className="text-3xl font-bold text-blue-600">{totalStudents}</p>
                    </div>
                    <div className="bg-white shadow-md rounded-xl p-6 text-center">
                        <h2 className="text-xl font-semibold text-gray-600">Vaccinated</h2>
                        <p className="text-3xl font-bold text-green-600">{vaccinated}</p>
                    </div>
                    <div className="bg-white shadow-md rounded-xl p-6 text-center">
                        <h2 className="text-xl font-semibold text-gray-600">Percentage</h2>
                        <p className="text-3xl font-bold text-purple-600">{vaccinationPercentage}%</p>
                    </div>
                </div>

                {/* Upcoming Drives */}
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Upcoming Vaccination Drives</h2>
                <div className="space-y-4">
                    {upcomingDrives.map((drive, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-sm border border-gray-200 rounded-lg p-4 grid grid-cols-3 items-center text-gray-700"
                        >
                            <h3 className="text-lg font-medium">{drive.name}</h3>
                            <p className="text-sm">{drive.vaccine}</p>
                            <p className="text-sm text-right">{new Date(drive.date).toDateString()}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
