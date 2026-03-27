import axios from "axios";
const API_URL = import.meta.env.VITE_API_BASE_URL;
function getToken(){
  const token = localStorage.getItem("Token");
  if(!token){
    throw new Error("No token found");
  }
  return token;
}
async function createUser(data) {
  try {
    const user = await axios.post(`${API_URL}/users/createUser`, data, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return user.data.user;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
async function createRole(data) {
  const { user, roleData } = data;
  const role = user.role;
  const id = user.id;
  const Role=role[0].toUpperCase() + role.slice(1);
    try {
      const specificRole = await axios.post(
        `${API_URL}/users/create${Role}`,
        {
          userId: id,
          ...roleData,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        },
      );
      return specificRole.data[role];
    } catch (err) {
      console.error(err);
      throw err;
    }
}
export const handleCreateUser = async (data) => {
  try {
    const { name, email, password, phoneNumber, role, roleData } = data;
    const user = await createUser({ name, email, password, phoneNumber, role });
    const Role = await createRole({ user, roleData });
    return Role;
  } catch (err) {
    const backendData = err.response?.data;
    const backendMessage = backendData?.message;
    const fallbackMessage = err.message || "User creation failed";
    console.error("BACKEND ERROR:", backendData || err);
    throw new Error(backendMessage || fallbackMessage);
  }
};
