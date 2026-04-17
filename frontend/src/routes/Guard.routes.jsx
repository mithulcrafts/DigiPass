import { Route } from "react-router-dom";
import GuardDashboard from "../pages/Guard/GuardDashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import Scan from "../pages/Guard/Scan";
import Verify from "../pages/Guard/Verify";
const GuardRoutes = (
  <Route element={<ProtectedRoute allowedRoles={["guard"]}/>}>
    <Route path="Guard/Dashboard" element={<GuardDashboard />} />
    <Route path="Guard/Scan" element={<Scan />} />
    <Route path="Verify/:token" element={<Verify/>}/>
  </Route>
);
export default GuardRoutes;
