import axios from 'axios';
const API_URL=import.meta.env.VITE_API_BASE_URL; //To import base api url from env
//Function that takes email, password as input and send that to backend and gets response from backend and returns that response
export const loginUser=async (email,password)=>{
    const response = await axios.post(`${API_URL}/signIn`,{
        email,
        password
    });
    return response.data;
}