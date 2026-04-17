import Button from '../../components/Button';
import {useNavigate} from 'react-router-dom';
import Header from '../../components/Header';
export default function AdminDashboard()
{
    const navigate=useNavigate();
    const handleNavigate=()=>
    {
        navigate('/Admin/CreateUser');
    }
    return(
        <>
            <Header/>
            <Button content="Create New User" onClick={handleNavigate}></Button>
        </>
    )
}