const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export const loginUser = async (username, password) => {
  const response = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erreur de connexion");
  }

  return data; // { token, role, userId, ... }
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};