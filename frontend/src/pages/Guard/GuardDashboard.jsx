import Header from "../../components/Header";
import Button from '../../components/Button';
import {useNavigate} from 'react-router-dom';
export default function GuardDashboard()
{
    const navigate=useNavigate();
    const handleNavigate=()=>
    {
        navigate('/Guard/Scan');
    }
    return(
        <>
            <Header/>
            <Button content="Scan" onClick={handleNavigate}></Button>
        </>
    )
}