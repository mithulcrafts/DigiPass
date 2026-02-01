import {Route} from 'react-router-dom'
import AdminDashboard from "../pages/Admin/AdminDashboard";

const AdminRoutes=(
    <Route path="Admin/Dashboard" element={<AdminDashboard/>}/>
); 
export default AdminRoutes