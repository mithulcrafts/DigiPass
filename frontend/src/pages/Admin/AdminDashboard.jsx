import Button from '../../components/Button';
import {useNavigate} from 'react-router-dom';
export default function AdminDashboard()
{
    const navigate=useNavigate();
    const handleNavigate=()=>
    {
        navigate('/Admin/CreateUser');
    }
    return(
        <>
            AdminDashboard
            <Button content="Create New User" onClick={handleNavigate}></Button>
        </>
    )
}