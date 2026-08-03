import api from "../api/axios";

// ======================
// Employee
// ======================

export const getMyTickets = async () => {
  const token = localStorage.getItem("access_token");

  const response = await api.get("/tickets/my", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const createTicket = async (ticketData) => {
  const token = localStorage.getItem("access_token");

  const response = await api.post(
    "/tickets",
    ticketData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// ======================
// Admin
// ======================

export const getAllTickets = async () => {
  const token = localStorage.getItem("access_token");

  const response = await api.get("/tickets", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const searchTickets = async (filters) => {
  const token = localStorage.getItem("access_token");

  const response = await api.get("/tickets/search", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: filters,
  });

  return response.data;
};

export const assignTicket = async (ticketId, assignedTo) => {
  const token = localStorage.getItem("access_token");

  const response = await api.put(
    `/tickets/${ticketId}/assign`,
    {
      assigned_to: assignedTo,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const updateTicketStatus = async (ticketId, status) => {
  const token = localStorage.getItem("access_token");

  const response = await api.put(
    `/tickets/${ticketId}/status`,
    {
      status,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};