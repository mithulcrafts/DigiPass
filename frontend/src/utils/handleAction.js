import axios from "axios";
const baseURL = import.meta.env.VITE_API_BASE_URL;
export async function handleAction(id, status) {
  const res=await axios.patch(
    `${baseURL}/outpass/${id}/status`,
    {
      status,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    },
  );
  return res.data.outpass;
}
