import { Route } from "react-router-dom";
import GuardDashboard from "../pages/Guard/GuardDashboard";
import ProtectedRoute from "../components/ProtectedRoute";
const GuardRoutes = (
  <Route element={<ProtectedRoute allowedRoles={["guard"]}/>}>
    <Route path="Guard/Dashboard" element={<GuardDashboard />} />
  </Route>
);
export default GuardRoutes;
