import {useState,useEffect} from 'react';
import { StudentPassHistory } from "../../components/Cards/PassHistory"
import getUser from "../../utils/getUser"
export default function StudentDashboard()
{
    const [user,setUser]=useState(null);
    useEffect(()=>{
        async function fetchUser(){
            const data=await getUser();
            setUser(data);
        }
        fetchUser();
    },[]);
    return(
        <>
            <h1>Hello {user?user.name:"bro"} !!</h1>
            <StudentPassHistory/>
        </>
    )
}