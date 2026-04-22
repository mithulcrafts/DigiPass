import axios from "axios";
const baseURL = import.meta.env.VITE_API_BASE_URL;
export default async function fetchData(endPoint, additional = null) {
  try {
    const token = localStorage.getItem("Token");
    const res = await axios.get(`${baseURL}${endPoint}`, {
      headers: token ? { authorization: `Bearer ${token}` } : {},
      params: additional,
    });
    return res.data;
  } catch (err) {
    console.error(err);
    console.log(`Error fetching from ${baseURL}${endPoint}`);
    throw err;
  }
}
