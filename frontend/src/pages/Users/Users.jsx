import { useEffect, useState } from "react";
import {
  getUsers,
  updateUserRole,
  updateUserStatus,
} from "../../services/userService";
import { registerUser } from "../../services/authService";
import { toast } from "react-toastify";

import "./Users.css";

function Users() {
  const [users, setUsers] = useState([]);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load users");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await registerUser({
        full_name: fullName,
        email,
        username,
        password,
      });

      toast.success("User created successfully!");

      setFullName("");
      setEmail("");
      setUsername("");
      setPassword("");

      await loadUsers();
    } catch (error) {
      console.error(error);

      if (error.response?.data?.detail) {
        toast.error(error.response.data.detail);
      } else {
        toast.error("Failed to create user");
      }
    }
  };

  const changeRole = async (id, role) => {
    try {
      await updateUserRole(id, role);

      await loadUsers();

      toast.success("Role updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update role");
    }
  };

  const toggleActive = async (id, isActive) => {
    try {
      await updateUserStatus(id, !isActive);

      await loadUsers();

      toast.success(
        !isActive
          ? "User activated successfully!"
          : "User deactivated successfully!"
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user status");
    }
  };

  return (
    <div className="users-page">

      <h1>👥 User Management</h1>

      <form
        className="users-form glass"
        onSubmit={handleRegister}
        autoComplete="off"
      >

        <h2>Register New User</h2>

        <input
          type="text"
          placeholder="Full Name"
          autoComplete="off"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">
          Create User
        </button>

      </form>

      <table className="users-table glass">

        <thead>

          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Role</th>
            <th>Status</th>
            <th>Role Action</th>
            <th>Status Action</th>
          </tr>

        </thead>

        <tbody>

          {users.map((user) => (

            <tr key={user.id}>

              <td>{user.id}</td>

              <td>{user.full_name}</td>

              <td>{user.email}</td>

              <td>{user.username}</td>

              <td>
                <span
                  className={
                    user.role === "ADMIN"
                      ? "role-admin"
                      : "role-employee"
                  }
                >
                  {user.role}
                </span>
              </td>

              <td>
                <span
                  className={
                    user.is_active
                      ? "active"
                      : "inactive"
                  }
                >
                  {user.is_active ? "Active" : "Inactive"}
                </span>
              </td>

              <td>

                <button
                  className="action-btn"
                  onClick={() =>
                    changeRole(
                      user.id,
                      user.role === "ADMIN"
                        ? "EMPLOYEE"
                        : "ADMIN"
                    )
                  }
                >
                  {user.role === "ADMIN"
                    ? "Make Employee"
                    : "Make Admin"}
                </button>

              </td>

              <td>

                <button
                  className="action-btn"
                  onClick={() =>
                    toggleActive(
                      user.id,
                      user.is_active
                    )
                  }
                >
                  {user.is_active
                    ? "Deactivate"
                    : "Activate"}
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Users;