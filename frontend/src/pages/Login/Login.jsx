import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  loginUser,
  getCurrentUser,
} from "../../services/authService";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(username, password);

localStorage.setItem(
  "access_token",
  data.access_token
);

const user = await getCurrentUser();

localStorage.setItem("role", user.role);
localStorage.setItem("full_name", user.full_name);

if (user.role === "ADMIN") {
  navigate("/dashboard");
} else {
  navigate("/tickets");
}
    } catch (error) {
  console.error("FULL ERROR:", error);

  if (error.response) {
    console.log("Status:", error.response.status);
    console.log("Data:", error.response.data);
  } else {
    console.log("Message:", error.message);
  }

  alert("Check the browser console.");
}
  };

  return (
    <div>
      <h1>VertexOps Login</h1>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <br /><br />

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;