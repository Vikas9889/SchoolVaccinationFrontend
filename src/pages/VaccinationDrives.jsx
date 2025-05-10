import React, { useState } from 'react';

export default function VaccinationDrives() {
  const [drives, setDrives] = useState([
    { id: 1, name: 'Drive A', vaccine: 'Covishield', date: '2025-05-25', doses: 100, classes: '5-7', expired: false },
    { id: 2, name: 'Drive B', vaccine: 'Covaxin', date: '2025-06-10', doses: 150, classes: '8-10', expired: false },
  ]);
  const [newDrive, setNewDrive] = useState({ name: '', vaccine: '', date: '', doses: '', classes: '' });
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleAddDrive = () => {
    const driveDate = new Date(newDrive.date);
    const today = new Date();

    if (driveDate < today || (driveDate - today) / (1000 * 60 * 60 * 24) < 15) {
      alert('Drives must be scheduled at least 15 days in advance.');
      return;
    }

    const conflict = drives.some((drive) => drive.date === newDrive.date);
    if (conflict) {
      alert('A drive is already scheduled on this date.');
      return;
    }

    setDrives([...drives, { ...newDrive, id: drives.length + 1, expired: false }]);
    setNewDrive({ name: '', vaccine: '', date: '', doses: '', classes: '' });
    setIsFormVisible(false);
  };

  const handleUpdateExpired = () => {
    const today = new Date();
    setDrives((prevDrives) =>
      prevDrives.map((drive) => ({
        ...drive,
        expired: new Date(drive.date) < today,
      }))
    );
  };

  const handleEditDrive = (id) => {
    const drive = drives.find((drive) => drive.id === id);
    if (new Date(drive.date) < new Date()) {
      alert('Cannot edit past drives.');
      return;
    }
    setNewDrive(drive);
    setIsFormVisible(true);
  };

  return (
    <div className="p-6 min-h-screen bg-white">
      <h2 className="text-2xl font-bold mb-4 text-black">Vaccination Drives</h2>

      {/* Toggle Add/Edit Drive Form */}
      <div className="mb-6">
        <button
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
        >
          {isFormVisible ? 'Close Form' : 'Add Drive'}
        </button>
      </div>

      {/* Add/Edit Drive Form */}
      {isFormVisible && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">{newDrive.id ? 'Edit Drive' : 'Schedule a New Drive'}</h3>
          <input
            type="text"
            placeholder="Drive Name"
            value={newDrive.name}
            onChange={(e) => setNewDrive({ ...newDrive, name: e.target.value })}
            className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Vaccine Name"
            value={newDrive.vaccine}
            onChange={(e) => setNewDrive({ ...newDrive, vaccine: e.target.value })}
            className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            value={newDrive.date}
            onChange={(e) => setNewDrive({ ...newDrive, date: e.target.value })}
            className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Number of Doses"
            value={newDrive.doses}
            onChange={(e) => setNewDrive({ ...newDrive, doses: e.target.value })}
            className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Applicable Classes (e.g., 5-7)"
            value={newDrive.classes}
            onChange={(e) => setNewDrive({ ...newDrive, classes: e.target.value })}
            className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddDrive}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            {newDrive.id ? 'Update Drive' : 'Add Drive'}
          </button>
        </div>
      )}

      {/* Drives List */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">Scheduled Drives</h3>
        <button
          onClick={handleUpdateExpired}
          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition mb-4"
        >
          Update Expired Drives
        </button>
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2">Drive Name</th>
              <th className="px-4 py-2">Vaccine</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Doses</th>
              <th className="px-4 py-2">Classes</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {drives.map((drive) => (
              <tr key={drive.id} className="border-b">
                <td className="px-4 py-2 text-center text-gray-800">{drive.name}</td>
                <td className="px-4 py-2 text-center text-gray-800">{drive.vaccine}</td>
                <td className="px-4 py-2 text-center text-gray-800">{drive.date}</td>
                <td className="px-4 py-2 text-center text-gray-800">{drive.doses}</td>
                <td className="px-4 py-2 text-center text-gray-800">{drive.classes}</td>
                <td className="px-4 py-2 text-center text-gray-800">
                  {drive.expired ? 'Expired' : 'Active'}
                </td>
                <td className="px-4 py-2 text-center space-x-2">
                  <button
                    onClick={() => handleEditDrive(drive.id)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600 transition"
                    disabled={drive.expired}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
