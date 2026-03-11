import { Route } from "react-router-dom";
import StudentDashboard from "../pages/Student/StudentDashboard";
import Outpass from "../pages/Student/Outpass";

const StudentRoutes = (
  <>
    <Route path="Student/Dashboard" element={<StudentDashboard />} />
    <Route path="Student/Outpass" element={<Outpass />} />
  </>
);

export default StudentRoutes;
