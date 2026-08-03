import { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/authService";

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
      alert("Failed to load profile");
    }
  };

  if (!user) {
    return <h2>Loading Profile...</h2>;
  }

  return (
    <div>
      <h1>My Profile</h1>

      <table border="1" cellPadding="10">
        <tbody>
          <tr>
            <td><strong>ID</strong></td>
            <td>{user.id}</td>
          </tr>

          <tr>
            <td><strong>Full Name</strong></td>
            <td>{user.full_name}</td>
          </tr>

          <tr>
            <td><strong>Username</strong></td>
            <td>{user.username}</td>
          </tr>

          <tr>
            <td><strong>Email</strong></td>
            <td>{user.email}</td>
          </tr>

          <tr>
            <td><strong>Role</strong></td>
            <td>{user.role}</td>
          </tr>

          <tr>
            <td><strong>Active</strong></td>
            <td>{user.is_active ? "Yes" : "No"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Profile;