import { Route } from "react-router-dom";
import OutpassDisplay from "../components/OutpassDisplay";
import ProtectedRoute from "../components/ProtectedRoute";
import Verify from "../pages/Guard/Verify";
const OutpassRoutes = (
  <Route element={<ProtectedRoute allowedRoles={["student","warden","guard","admin"]}/>}>
    <Route path="Outpass/:id" element={<OutpassDisplay/>} />
    <Route path="verify/:token" element={<Verify/>} />
  </Route>
);
export default OutpassRoutes;