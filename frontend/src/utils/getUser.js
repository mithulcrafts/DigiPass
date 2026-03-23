async function getUser() {
  const token = localStorage.getItem("Token");
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP error ${res.status}: ${text}`);
  }
  const getUser = await res.json();
  return getUser;
}
async function getUserById(id) {
  const token = localStorage.getItem("Token");
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/${id}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP error ${res.status}: ${text}`);
  }
  const getUser = await res.json();
  return getUser;
}
export { getUser, getUserById };
