import api from "../api/axios";

export const getUsers = async () => {
  const token = localStorage.getItem("access_token");

  const response = await api.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const updateUserRole = async (userId, role) => {
  const token = localStorage.getItem("access_token");

  const response = await api.put(
    `/users/${userId}/role`,
    { role },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const updateUserStatus = async (userId, isActive) => {
  const token = localStorage.getItem("access_token");

  const response = await api.put(
    `/users/${userId}/active`,
    { is_active: isActive },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};