import React,{useEffect} from "react";
import Navbar from "./Navbar";

const Dashboard = () => {
    const [data, setData] = React.useState(null);
    const [upcomingDrives, setUpcomingDrives] = React.useState([]);
    useEffect(() => {
        (async ()=>{
            try {
                const response = await fetch('http://localhost:3005/api/drives/dashboard');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        })();
    }, []);

        useEffect(() => {
        (async ()=>{
            try {
                const response = await fetch('http://localhost:3005/api/drives/upcoming');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUpcomingDrives(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        })();
    }, []);

    
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="p-6">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Vaccination Dashboard</h1>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white shadow-md rounded-xl p-6 text-center">
                        <h2 className="text-xl font-semibold text-gray-600">Total Students</h2>
                        <p className="text-3xl font-bold text-blue-600">{data?.totalStudents}</p>
                    </div>
                    <div className="bg-white shadow-md rounded-xl p-6 text-center">
                        <h2 className="text-xl font-semibold text-gray-600">Vaccinated</h2>
                        <p className="text-3xl font-bold text-green-600">{data?.vaccinatedStudents}</p>
                    </div>
                    <div className="bg-white shadow-md rounded-xl p-6 text-center">
                        <h2 className="text-xl font-semibold text-gray-600">Percentage</h2>
                        <p className="text-3xl font-bold text-purple-600">{data?.vaccinationPercentage}%</p>
                    </div>
                </div>

                {/* Upcoming Drives */}
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Upcoming Vaccination Drives</h2>
                {/* Conditional rendering for upcoming drives */}
                {upcomingDrives.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                            <thead>
                                <tr className="bg-gray-200 text-gray-600">
                                    <th className="py-3 px-6 text-center">Drive Name</th>
                                    <th className="py-3 px-6 text-center">Vaccine</th>
                                    <th className="py-3 px-6 text-center">Date</th>
                                    <th className="py-3 px-6 text-center">Doses</th>
                                </tr>
                            </thead>
                            <tbody>
                                {upcomingDrives.map((drive) => (
                                    <tr key={drive.id} className="border-b hover:bg-gray-50">
                                        <td className="py-2 px-6 text-center text-gray-800">{drive.vaccineName}</td>
                                        <td className="py-2 px-6 text-center text-gray-800">{drive.vaccineName}</td>
                                        <td className="py-2 px-6 text-center text-gray-800">{new Date(drive.date).toLocaleDateString()}</td>
                                        <td className="py-2 px-6 text-center text-gray-800">{drive.dosesAvailable}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                            <thead>
                                <tr className="bg-gray-200 text-gray-600">
                                    <th className="py-3 px-6 text-center">Drive Name</th>
                                    <th className="py-3 px-6 text-center">Vaccine</th>
                                    <th className="py-3 px-6 text-center">Date</th>
                                    <th className="py-3 px-6 text-center">Doses</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b hover:bg-gray-50">
                                    <td colSpan="4" className="py-2 px-6 text-center text-red-800">No upcoming vaccination drives available</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
