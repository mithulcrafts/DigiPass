import axios from "axios";
const baseURL = import.meta.env.VITE_API_BASE_URL;
export default async function getOutpasses(
  endPoint,
  additional = null,
) {
  try {
    const token = localStorage.getItem("Token");
    const res = await axios.get(
      `${baseURL}${endPoint}`,
      {
        headers:
        {
            authorization: `Bearer ${token}`,
        },
        params:additional
      },
    );
    console.log("Outpasses fetched successfully");
    return res;
  } catch (err) {
    console.error(err);
    console.log("Error fetching outpasses");
  }
};
