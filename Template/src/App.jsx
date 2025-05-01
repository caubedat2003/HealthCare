import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import Register from './components/Register';
import Login from './components/Login';
import AdminLayout from './components/AdminLayout';
import AdminHome from './components/admin/AdminHome';
import UserManager from './components/admin/UserManager';
import RoleManager from './components/admin/RoleManager';
import PatientTypeManager from './components/admin/PatientTypeManager';
import DoctorSchedule from './components/admin/DoctorSchedule';
import NurseSchedule from './components/admin/NurseSchedule';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-page" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="users" element={<UserManager />} />
          <Route path="roles" element={<RoleManager />} />
          <Route path="patient-types" element={<PatientTypeManager />} />
          <Route path="doctor-schedule" element={<DoctorSchedule />} />
          <Route path="nurse-schedule" element={<NurseSchedule />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;