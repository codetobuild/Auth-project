import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./styles/Login.css";
import useLogin from "../hooks/useLogin";
import useError from "../hooks/useError";

const Register = ({ history }) => {
  // states
  const { email, setEmail, password, setPassword } = useLogin();
  const { error, setError } = useError();

  useEffect(() => {
    if (localStorage.getItem("loggedIn") === "true") {
      history.push("/");
    }
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    const config = {
      header: { "content-Type": "application/json" },
      withCredentials: true,
    };
    console.log(email);
    console.log(password);

    try {
      const { data } = await axios.post(
        "/api/auth/login",
        {
          email,
          password,
        },
        config
      );

      localStorage.setItem("loggedIn", true);
      history.replace("/");
    } catch (err) {
      console.log(err.message);
      setError(err.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  // return jsx
  return (
    <div className="login-screen">
      <form onSubmit={handleLogin} className="login-screen__form">
        <h3 className="login-screen__title">Login</h3>
        {error && <span className="error-message">{error}</span>}

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            required
            id="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Password:
            <Link to="/forgotpassword" className="login-screen__forgotpassword">
              Forgot Password?
            </Link>
          </label>
          <input
            type="password"
            required
            id="password"
            autoComplete="true"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>

        <span className="login-screen__subtext">
          Don't have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
