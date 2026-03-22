import {Navigate,Outlet} from 'react-router-dom'
export default function ProtectedRoute({allowedRoles}){
    const role = localStorage.getItem('role');
    if(!role)
    {
        return <Navigate to="/" replace/>
    }
    if(!allowedRoles.includes(role))
    {
        return <Navigate to="/Unauthorized" replace/>
    }
    return <Outlet/>;
}