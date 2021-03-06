import { useState, useEffect } from "react";
import axios from "axios";
import "./styles/privatePage.css";

const PrivatePage = ({ history }) => {
  const [error, setError] = useState("");
  const [userData, setUserData] = useState("");

  useEffect(() => {
    if (localStorage.getItem("loggedIn") !== "true") {
      history.push("/login");
    } 

    const fetchPrivateData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.get("/api/home", config);
        setUserData({ ...data.data });
      } catch (error) {
        setError("You are not authorized please login");
        history.push("/login");
      }
    };

    fetchPrivateData();
  }, []);

  const handleLogout = async () => {
    const config = {
      header: { "content-Type": "application/json" },
      withCredentials: true,
    };
    try {
      const { data } = await axios.post("/api/auth/logout", config);
      localStorage.removeItem("loggedIn");
      history.push("/login");
    } catch (err) {
      setError("Error while logging out");
    }
  };

  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <>
      <div className="card">
        <h2 className="card_item">๐Hello {userData.username}</h2>
        <main className="main_content">
          <p>Name: {userData.name}</p>
          <p>Username: {userData.username}</p>
          <p>Email: {userData.email}</p>
          <p>Address: {userData.address}</p>
          <p>Mobile: {userData.mobile}</p>
        </main>
        <button
          onClick={handleLogout}
          style={{ backgroundColor: "blue", color: "white", padding: "5px" }}>
          Log out ๐
        </button>
      </div>
    </>
  );
};

export default PrivatePage;
