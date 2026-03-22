import {Route} from 'react-router-dom'
import WardenDashboard from "../pages/Warden/WardenDashboard";
import ProtectedRoute from '../components/ProtectedRoute';
const WardenRoutes=(
    <Route element={<ProtectedRoute allowedRoles={["warden"]}/>}>
        <Route path="Warden/Dashboard" element={<WardenDashboard/>}/>
    </Route>
); 

export default WardenRoutes