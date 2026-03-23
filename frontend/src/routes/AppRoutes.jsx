import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Unauthorized from "../pages/Unauthorized";
import GuardRoutes from "./Guard.routes";
import AdminRoutes from "./Admin.routes";
import StudentRoutes from "./Student.routes";
import WardenRoutes from "./Warden.routes";
import OutpassRoutes from "./Outpass.routes";
import {Routes, Route} from 'react-router-dom';
export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>}/>
        {AdminRoutes}
        {WardenRoutes}
        {StudentRoutes}
        {GuardRoutes}
        {OutpassRoutes}
        <Route path="/Unauthorized" element={<Unauthorized/>}/>
        <Route path="/*" element={<NotFound/>}/>
      </Routes>
    </>
  );
}
