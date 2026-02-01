import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import GuardRoutes from "./Guard.routes";
import AdminRoutes from "./Admin.routes";
import StudentRoutes from "./Student.routes";
import WardenRoutes from "./Warden.routes";
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
        <Route path="/*" element={<NotFound/>}/>
      </Routes>
    </>
  );
}
