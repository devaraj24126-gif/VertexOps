import { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/authService";
import { toast } from "react-toastify";

import "./Profile.css";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getCurrentUser();
      setUser(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load profile");
    }
  };

  if (!user) {
    return <h2>Loading Profile...</h2>;
  }

  return (
    <div className="profile-page">
      <h1>👤 My Profile</h1>

      <div className="profile-card glass">
        <table className="profile-table">
          <tbody>
            <tr>
              <td className="profile-label">ID</td>
              <td>{user.id}</td>
            </tr>

            <tr>
              <td className="profile-label">Full Name</td>
              <td>{user.full_name}</td>
            </tr>

            <tr>
              <td className="profile-label">Username</td>
              <td>{user.username}</td>
            </tr>

            <tr>
              <td className="profile-label">Email</td>
              <td>{user.email}</td>
            </tr>

            <tr>
              <td className="profile-label">Role</td>
              <td>
                <span className="role-badge">
                  {user.role}
                </span>
              </td>
            </tr>

            <tr>
              <td className="profile-label">Status</td>
              <td>
                <span
                  className={
                    user.is_active
                      ? "status-active"
                      : "status-inactive"
                  }
                >
                  {user.is_active ? "Active" : "Inactive"}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Profile;