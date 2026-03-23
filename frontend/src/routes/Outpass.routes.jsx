import { Route } from "react-router-dom";
import OutpassDisplay from "../components/OutpassDisplay";
import ProtectedRoute from "../components/ProtectedRoute";
const OutpassRoutes = (
  <Route element={<ProtectedRoute allowedRoles={["student","warden","guard","admin"]}/>}>
    <Route path="Outpass/:id" element={<OutpassDisplay/>} />
  </Route>
);
export default OutpassRoutes;