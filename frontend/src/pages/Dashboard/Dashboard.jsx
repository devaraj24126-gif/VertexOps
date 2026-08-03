import { useEffect, useState } from "react";
import api from "../../api/axios";

function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const token = localStorage.getItem("access_token");

        const response = await api.get("/dashboard/stats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStats(response.data);
      } catch (error) {
  console.error("Dashboard Error:", error);

  if (error.response) {
    console.log(error.response.status);
    console.log(error.response.data);
  }

  alert("Dashboard API failed. Check console.");
}
    };

    loadStats();
  }, []);

  if (!stats) {
    return <h2>Loading dashboard...</h2>;
  }

  return (
    <div>
      <h1>VertexOps Dashboard</h1>

      <h3>Total Users: {stats.total_users}</h3>
      <h3>Total Tickets: {stats.total_tickets}</h3>
      <h3>Open Tickets: {stats.open_tickets}</h3>
      <h3>In Progress: {stats.in_progress_tickets}</h3>
      <h3>Resolved: {stats.resolved_tickets}</h3>
      <h3>Closed: {stats.closed_tickets}</h3>
    </div>
  );
}

export default Dashboard;