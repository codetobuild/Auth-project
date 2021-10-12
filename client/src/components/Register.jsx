import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./styles/Register.css";

const Register = (props) => {
  const { history } = props;
  // states
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobileNumber] = useState("");
  const [error, setError] = useState("");

  // useEffect(() => {
  //   if (localStorage.getItem("authToken")) {
  //     history.push("/login");
  //   }
  // }, [history]);

  const registerHandler = async (e) => {
    e.preventDefault();
    const config = {
      header: { "content-Type": "application/json" },
      withCredentials: true,
    };

    if (password !== confirmpassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      // don't submit form
      return setError("Password doesn't match");
    }

    try {
      const { data } = await axios.post(
        "/api/auth/register",
        {
          username,
          name,
          email,
          password,
          address,
          mobile,
        },
        config
      );

      // localStorage.setItem("authToken", data.token);
      history.push("/login");
    } catch (err) {
      setError(err.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  // return jsx
  return (
    <div className="register-screen">
      <form onSubmit={registerHandler} className="register-screen__form">
        <h3 className="register-screen__title">Register</h3>
        {error && <span className="error-message">{error}</span>}
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            required
            id="username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            required
            id="name"
            placeholder="Enter fullname"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
          <label htmlFor="password">Password:</label>
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
        <div className="form-group">
          <label htmlFor="confirmpassword">Confirm Password:</label>
          <input
            type="password"
            required
            id="confirmpassword"
            autoComplete="true"
            placeholder="Confirm password"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            required
            id="address"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobilenumber">Mobile Number</label>
          <input
            type="mobilenumber"
            required
            id="address"
            placeholder="Enter address"
            value={mobile}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>

        <span className="register-screen__subtext">
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
