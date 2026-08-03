import { useEffect, useState } from "react";
import {
  getUsers,
  updateUserRole,
  updateUserStatus,
} from "../../services/userService";
import { registerUser } from "../../services/authService";

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
      alert("Failed to load users");
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

      alert("User created successfully!");

      setFullName("");
      setEmail("");
      setUsername("");
      setPassword("");

      await loadUsers();
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.log(error.response.data);
        alert(JSON.stringify(error.response.data, null, 2));
      } else {
        alert(error.message);
      }
    }
  };

  const changeRole = async (id, role) => {
    try {
      await updateUserRole(id, role);
      await loadUsers();
      alert("Role updated!");
    } catch (error) {
      console.error(error);
      alert("Failed to update role");
    }
  };

  const toggleActive = async (id, isActive) => {
    try {
      await updateUserStatus(id, !isActive);
      await loadUsers();
      alert("User status updated!");
    } catch (error) {
      console.error(error);
      alert("Failed to update status");
    }
  };

  return (
    <div>
      <h1>User Management</h1>

      <hr />

      <h2>Register New User</h2>

      <form onSubmit={handleRegister} autoComplete="off">
        <input
          type="text"
          placeholder="Full Name"
          autoComplete="off"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        <br />
        <br />

        <input
          type="email"
          placeholder="Email"
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="Username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <br />
        <br />

        <button type="submit">
          Create User
        </button>
      </form>

      <hr />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Role</th>
            <th>Active</th>
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
              <td>{user.role}</td>
              <td>{user.is_active ? "Yes" : "No"}</td>

              <td>
                <button
                  onClick={() =>
                    changeRole(
                      user.id,
                      user.role === "ADMIN"
                        ? "EMPLOYEE"
                        : "ADMIN"
                    )
                  }
                >
                  Make {user.role === "ADMIN" ? "Employee" : "Admin"}
                </button>
              </td>

              <td>
                <button
                  onClick={() =>
                    toggleActive(user.id, user.is_active)
                  }
                >
                  {user.is_active ? "Deactivate" : "Activate"}
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