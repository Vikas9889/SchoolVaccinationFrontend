// src/routes/AppRoutes.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../components/Login';
import Dashboard from '../components/Dashboard';
import Signup from '../components/SignUp';
import ManageStudents from '../pages/ManageStudents';
import VaccinationDrives from '../pages/VaccinationDrives';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/manage-students" element={<ManageStudents />} />
    <Route path="/vaccination-drives" element={<VaccinationDrives />} />
  </Routes>
);

export default AppRoutes;
