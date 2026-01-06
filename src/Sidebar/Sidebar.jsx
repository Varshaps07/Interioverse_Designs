import React from "react";
import "./Sidebar.css";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {



    const navigate = useNavigate();
    return (
        <div className="sidebar">
            <img
                src="https://interioverse.com/_next/static/media/header_logo.16f5c53e.png"
                alt=""
                height={33}
                style={{ marginBottom: 20 }}
            />

            <div className="header">
                <span>Quick Actions</span>
                <i className="fa-solid fa-bars hamburger"></i>
            </div>

            <div className="list">
                <div className="item">
                    <span className="plus">+</span>

                    <span>Dashboard</span>
                </div>
                <div className="item">
                    <span className="plus">+</span>

                    <span>Properties</span>
                </div>
                <div className="item">
                    <span className="plus">+</span>
                    <span>Models</span>

                </div>
                <div className="item active">
                    <span className="plus">+</span>

<span>Users</span>                </div>
                <div className="item">
                    <span className="plus">+</span>

                    <span>Settings</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
