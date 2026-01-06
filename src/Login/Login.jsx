import React, { useState, useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../Redux/AuthSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const Admin_name = "varsha";
  const pass = "123";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  

  //🔥 Redirect if already logged in




  useEffect(() => {
    const isAuth = JSON.parse(localStorage.getItem("isAuth"));
    if (isAuth) {
      navigate("/users", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let err = {};

    if (!username) err.username = "Username is required";
    if (!password) err.password = "Password is required";

    setError(err);

    if (Object.keys(err).length === 0) {
      if (username === Admin_name && password === pass) {
        localStorage.setItem("isAuth", "true");   // 🔥 persist login
        dispatch(loginSuccess());

        navigate("/users", { replace: true });   // 🔥 replace history
      } else {
        alert("Invalid details");
      }
    }

    setUsername("");
    setPassword("");
  };

  return (
    <>
      <div className="login-navbar">
        <img
          src="https://interioverse.com/_next/static/media/header_logo.16f5c53e.png"
          alt="Interioverse"
          className="login-logo"
        />
      </div>

      <div className="login-outer">
        <div className="login2">
          <div className="login">
            <h2 style={{ color: "#1F425A" }}>Login to account</h2>

            <form onSubmit={handleSubmit}>
              <div className="inputs">
                <label>Username</label>
                <input
                  type="text"
                  placeholder="type here"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (error.username) setError(prev => ({ ...prev, username: "" }));
                  }}
                />
                {error.username && <p className="error">{error.username}</p>}
              </div>

              <div className="inputs">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error.password) setError(prev => ({ ...prev, password: "" }));
                  }}
                />
                {error.password && <p className="error">{error.password}</p>}
              </div>

              <button type="submit">Verify</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
