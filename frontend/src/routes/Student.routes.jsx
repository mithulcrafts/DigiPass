import { Route } from "react-router-dom";
import StudentDashboard from "../pages/Student/StudentDashboard";
import Outpass from "../pages/Student/Outpass";
import ProtectedRoute from "../components/ProtectedRoute";

const StudentRoutes = (
  <>
    <Route element={<ProtectedRoute allowedRoles={['student']}/>}>
      <Route path="Student/Dashboard" element={<StudentDashboard />} />
      <Route path="Student/Outpass" element={<Outpass />} />
    </Route>
  </>
);

export default StudentRoutes;
