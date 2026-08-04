import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import "./MainLayout.css";

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
    <div className="layout">

      <nav className="navbar glass">

        <div className="nav-left">

          <div className="logo">
            ⚡ VertexOps
          </div>

          {role === "ADMIN" && (
            <>
              <NavLink to="/dashboard">
                Dashboard
              </NavLink>

              <NavLink to="/admin-tickets">
                Tickets
              </NavLink>

              <NavLink to="/users">
                Users
              </NavLink>
            </>
          )}

          <NavLink to="/tickets">
            My Tickets
          </NavLink>

          <NavLink to="/profile">
            Profile
          </NavLink>

        </div>

        <div className="nav-right">

          <span>
            Welcome, {fullName}
          </span>

          <button
            className="btn logout-btn"
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </nav>

      <main className="content fade-up">
        <Outlet />
      </main>

      <Footer />

    </div>
  );
}

export default MainLayout;