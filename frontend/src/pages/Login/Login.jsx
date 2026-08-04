import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  loginUser,
  getCurrentUser,
} from "../../services/authService";
import { toast } from "react-toastify";

import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(
        username,
        password
      );

      localStorage.setItem(
        "access_token",
        data.access_token
      );

      const user = await getCurrentUser();

      localStorage.setItem(
        "role",
        user.role
      );

      localStorage.setItem(
        "full_name",
        user.full_name
      );

      toast.success("Login successful!");

      setTimeout(() => {
        if (user.role === "ADMIN") {
          navigate("/dashboard");
        } else {
          navigate("/tickets");
        }
      }, 700);

    } catch (error) {

      console.error(error);

      toast.error("Invalid email or password.");

    }
  };

  return (

    <div className="login-page">

      <div className="login-card glass fade-up">

        <h1>⚡ VertexOps</h1>

        <p>
          IT Help Desk Management System
        </p>

        <form onSubmit={handleLogin}>

          <input
            type="text"
            placeholder="Email"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            className="login-btn"
            type="submit"
          >
            Login
          </button>

        </form>

      </div>

    </div>

  );
}

export default Login;