import { useEffect, useState } from "react";
import {
  FaUsers,
  FaTicketAlt,
  FaFolderOpen,
  FaSpinner,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

import api from "../../api/axios";
import StatCard from "../../components/StatCard/StatCard";

import "./Dashboard.css";

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
        console.error(error);
        alert("Dashboard API failed.");
      }
    };

    loadStats();
  }, []);

  if (!stats) {
    return <h2>Loading Dashboard...</h2>;
  }

  return (
    <div className="dashboard">

      <div className="dashboard-header">
        <h1>VertexOps Dashboard</h1>
        <p>Welcome back 👋 Here's what's happening today.</p>
      </div>

      <div className="stats-grid">

        <StatCard
          title="Users"
          value={stats.total_users}
          icon={<FaUsers />}
        />

        <StatCard
          title="Tickets"
          value={stats.total_tickets}
          icon={<FaTicketAlt />}
        />

        <StatCard
          title="Open"
          value={stats.open_tickets}
          icon={<FaFolderOpen />}
        />

        <StatCard
          title="In Progress"
          value={stats.in_progress_tickets}
          icon={<FaSpinner />}
        />

        <StatCard
          title="Resolved"
          value={stats.resolved_tickets}
          icon={<FaCheckCircle />}
        />

        <StatCard
          title="Closed"
          value={stats.closed_tickets}
          icon={<FaTimesCircle />}
        />

      </div>

    </div>
  );
}

export default Dashboard;