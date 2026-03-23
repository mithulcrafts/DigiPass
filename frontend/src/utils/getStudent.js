async function getStudent() {
    const token=localStorage.getItem("Token");
    const res=await fetch(`${import.meta.env.VITE_API_BASE_URL}/student/me`,{
        method:"GET",
        headers:{
            authorization:`Bearer ${token}`
        }
    });
    if(!res.ok){
        const text = await res.text();
        throw new Error(`HTTP error ${res.status}: ${text}`);
    }
    const getStudent=await res.json();
    return getStudent;
}
async function getStudentById(id) {
    const token=localStorage.getItem("Token");
    const res=await fetch(`${import.meta.env.VITE_API_BASE_URL}/student/${id}`,{
        method:"GET",
        headers:{
            authorization:`Bearer ${token}`
        }
    });
    if(!res.ok){
        const text = await res.text();
        throw new Error(`HTTP error ${res.status}: ${text}`);
    }
    const getStudent=await res.json();
    return getStudent;
}

export {getStudent,getStudentById};