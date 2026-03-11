async function getUser() {
    const token=localStorage.getItem("Token");
    const res=await fetch("http://localhost:4000/api/users/me",{
        method:"GET",
        headers:{
            authorization:`Bearer ${token}`
        }
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP error ${res.status}: ${text}`);
    }
    const getUser=await res.json();
    return getUser;
}
export default getUser;