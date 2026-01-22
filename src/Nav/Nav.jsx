import React from "react";
import "./Nav.css";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/AuthSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../api/axiosInstance";
import logo from "../assets/logo"
const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

const handleLogout = async () => {
  try {
    console.log("Logout button clicked");

    const res = await axiosInstance.get("/auth/logout");

    console.log("Backend logout response:", res.data);

    // Mark that user just logged out
    sessionStorage.setItem("justLoggedOut", "true");

    localStorage.clear();
    sessionStorage.removeItem("token");

    navigate("/", { replace: true });

    console.log("Navigated to login page after logout");

  } catch (err) {
    console.log("Logout error:", err);
  }
};


  return (
    // <div className="users-page">
    //   <div className="users-navbar">
    //     <div className="nav-left">
    //       <span className="users">Users</span>
    //     </div>

    //     <div>
    //       <span className="home">Home</span>
    //     </div>

    //     {/* Right Side */}
        // <div className="nav-right">
        //   <img
        //     src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
        //     alt="profile"
        //     className="profile-pic"
        //   />
        //   <button className="logout-btn" onClick={handleLogout}>
        //     Sign Out
        //   </button>
        // </div>
    //   </div>
    // </div>
<nav>
  <div className="nav-left">
    <h2>Users</h2>
  </div>

  <div className="nav-right">
    <span className="home">Home</span>
    <img
      src={logo}
      alt="profile"
      className="profile"
    />
    <button className="logout-btn" onClick={handleLogout}>
      Sign Out
    </button>
  </div>
</nav>

  );
};

export default Nav;
