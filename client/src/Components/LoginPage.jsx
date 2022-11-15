import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { login } from "../Functions/auth";

function LoginPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const doLogin = () => {
    axios.post("http://localhost:3003/login", { user, pass }).then((res) => {
      console.log(res.data);
      if ("ok" === res.data.msg) {
        login(res.data.key);
        navigate("/admin/", { replace: true });
      }
    });
  };
  return (
    <div className="login-container">
      <div className="login-header">
        <label className="login-label">name:</label>
        <input
          className="login-input"
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
      </div>
      <div className="login-header">
        <label>password:</label>
        <input
          className="login-input"
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
      </div>
      <button className="create-button" onClick={doLogin}>
        Login
      </button>
    </div>
  );
}

export default LoginPage;
