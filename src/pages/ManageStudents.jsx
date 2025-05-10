import React, { useState } from 'react';
import Papa from 'papaparse';

export default function ManageStudents() {
  const [students, setStudents] = useState([
    { studentId: 1, name: 'John Doe', className: '10A', vaccinated: 'Yes' },
    { studentId: 2, name: 'Jane Smith', className: '9B', vaccinated: 'No' },
  ]);
  const [csvFile, setCsvFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newStudent, setNewStudent] = useState({ studentId: '', name: '', className: '', vaccinated: 'No' });
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleCsvUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const parsedData = results.data.map((row) => ({
            studentId: parseInt(row['Student ID'], 10),
            name: row['Name'],
            className: row['Class'],
            vaccinated: 'No', // Default value for vaccinated
          }));
          setStudents((prevStudents) => [...prevStudents, ...parsedData]);
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
        },
      });
    }
  };

  const handleAddStudent = () => {
    setStudents([...students, { ...newStudent, studentId: students.length + 1 }]);
    setNewStudent({ studentId: '', name: '', className: '', vaccinated: 'No' });
    setIsFormVisible(false);
  };

  const handleDeleteStudent = (id) => {
    setStudents(students.filter((student) => student.studentId !== id));
  };

  const handleMarkVaccinated = (id) => {
    setStudents(
      students.map((student) =>
        student.studentId === id ? { ...student, vaccinated: 'Yes' } : student
      )
    );
  };

  const filteredStudents = students.filter((student) => {
    const query = searchQuery.toLowerCase();
    return (
      student.name.toLowerCase().includes(query) ||
      student.studentId.toString().includes(query) ||
      student.vaccinated.toLowerCase().includes(query)
    );
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Manage Students</h2>

      {/* Upload CSV and Add Student Button */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <input
            type="file"
            accept=".csv"
            onChange={handleCsvUpload}
            className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <button
            onClick={() => alert('Upload functionality not implemented yet')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Upload
          </button>
        </div>
        <button
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
        >
          {isFormVisible ? 'Close Form' : 'Add Student'}
        </button>
      </div>

      {/* Add Student Form */}
      {isFormVisible && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Add/Edit Student</h3>
          <input
            type="text"
            placeholder="Name"
            value={newStudent.name}
            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
            className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Class"
            value={newStudent.className}
            onChange={(e) => setNewStudent({ ...newStudent, className: e.target.value })}
            className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddStudent}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Save Student
          </button>
        </div>
      )}

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by ID, Name, or Vaccination Status"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Student Table */}
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-4 py-2">Student ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Class</th>
            <th className="px-4 py-2">Vaccinated</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.studentId} className="border-b">
              <td className="px-4 py-2 text-center">{student.studentId}</td>
              <td className="px-4 py-2 text-center">{student.name}</td>
              <td className="px-4 py-2 text-center">{student.className}</td>
              <td className="px-4 py-2 text-center">{student.vaccinated}</td>
              <td className="px-4 py-2 text-center space-x-2">
                <button
                  onClick={() => handleMarkVaccinated(student.studentId)}
                  className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 transition"
                >
                  Mark Vaccinated
                </button>
                <button
                  onClick={() => handleDeleteStudent(student.studentId)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}