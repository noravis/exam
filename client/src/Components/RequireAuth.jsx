import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { authConfig } from "../Functions/auth";

function RequireAuth({ children }) {
  const [view, setView] = useState(<h2>Please wait...</h2>);

  useEffect(() => {
    axios.get("http://localhost:3003/login-check", authConfig()).then((res) => {
      if ("ok" === res.data.msg) {
        setView(children);
      } else {
        setView(<Navigate to="/login" replace />);
      }
    });
  }, [children]);

  return view;
}

export default RequireAuth;
