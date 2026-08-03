import { Link, Outlet, useNavigate } from "react-router-dom";

function MainLayout() {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const fullName = localStorage.getItem("full_name");

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("role");
    localStorage.removeItem("full_name");

    navigate("/");
  };

  return (
    <div>
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          padding: "15px",
          borderBottom: "1px solid #ccc",
        }}
      >
        {role === "ADMIN" && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/admin-tickets">Admin Tickets</Link>
            <Link to="/users">Users</Link>
          </>
        )}

        <Link to="/tickets">My Tickets</Link>

        <Link to="/profile">Profile</Link>

        <span style={{ marginLeft: "auto" }}>
          Welcome, {fullName}
        </span>

        <button onClick={logout}>
          Logout
        </button>
      </nav>

      <div style={{ padding: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;