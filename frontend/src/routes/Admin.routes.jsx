import { Route } from "react-router-dom";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import ProtectedRoute from "../components/ProtectedRoute";
const AdminRoutes = (
  <Route element={<ProtectedRoute allowedRoles={["admin"]}/>}>
    <Route path="Admin/Dashboard" element={<AdminDashboard />} />
  </Route>
);
export default AdminRoutes;
