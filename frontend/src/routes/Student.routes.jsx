import {Route} from 'react-router-dom'
import StudentDashboard from "../pages/Student/StudentDashboard";

const StudentRoutes=(
    <Route path="Student/Dashboard" element={<StudentDashboard/>}/>
); 

export default StudentRoutes