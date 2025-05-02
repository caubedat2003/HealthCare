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
import PatientLayout from './components/PatientLayout';
import PatientHome from './components/patient/PatientHome';
import BookAppointment from './components/patient/BookAppointment';
import MedicalReport from './components/patient/MedicalReport';
import LabTestReport from './components/patient/LabTestReport';
import ReceivePrescription from './components/patient/ReceivePrescription';
import PayMedicalBill from './components/patient/PayMedicalBill';
import DoctorLayout from './components/DoctorLayout';
import DoctorHome from './components/doctor/DoctorHome';
import ScheduleAppointments from './components/doctor/ScheduleAppointments';
import PatientHistory from './components/doctor/PatientHistory';
import Treatments from './components/doctor/Treatments';
import OrderLabTests from './components/doctor/OrderLabTests';
import MedicalReports from './components/doctor/MedicalReports';
import PharmacyLayout from './components/PharmacyLayout';
import PharmacyHome from './components/pharmacy/PharmacyHome';
import PrescriptionsControl from './components/pharmacy/PrescriptionsControl';
import ManageStock from './components/pharmacy/ManageStock';
import ProcessPayments from './components/pharmacy/ProcessPayments';
import LaboratoryLayout from './components/LaboratoryLayout';
import LaboratoryHome from './components/laboratory/LaboratoryHome';
import MedicalTests from './components/laboratory/MedicalTests';
import TestReports from './components/laboratory/TestReports';

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

        <Route path="/patient" element={<PatientLayout />}>
          <Route index element={<PatientHome />} />
          <Route path="book-appointment" element={<BookAppointment />} />
          <Route path="medical-report" element={<MedicalReport />} />
          <Route path="lab-test-report" element={<LabTestReport />} />
          <Route path="prescription" element={<ReceivePrescription />} />
          <Route path="pay-bill" element={<PayMedicalBill />} />
        </Route>

        <Route path="/doctor" element={<DoctorLayout />}>
          <Route index element={<DoctorHome />} />
          <Route path="schedule" element={<ScheduleAppointments />} />
          <Route path="patient-history" element={<PatientHistory />} />
          <Route path="treatments" element={<Treatments />} />
          <Route path="lab-tests" element={<OrderLabTests />} />
          <Route path="medical-reports" element={<MedicalReports />} />
        </Route>

        <Route path="/pharmacy" element={<PharmacyLayout />}>
          <Route index element={<PharmacyHome />} />
          <Route path="prescriptions" element={<PrescriptionsControl />} />
          <Route path="stock" element={<ManageStock />} />
          <Route path="payments" element={<ProcessPayments />} />
        </Route>

        <Route path="/laboratory" element={<LaboratoryLayout />}>
          <Route index element={<LaboratoryHome />} />
          <Route path="tests" element={<MedicalTests />} />
          <Route path="reports" element={<TestReports />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;