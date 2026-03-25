import { Route } from "react-router-dom";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import CreateUser from "../pages/Admin/CreateUser";
const AdminRoutes = (
  <Route element={<ProtectedRoute allowedRoles={["admin"]}/>}>
    <Route path="Admin/Dashboard" element={<AdminDashboard />} />
    <Route path="Admin/CreateUser" element={<CreateUser/>} />
  </Route>
);
export default AdminRoutes;
