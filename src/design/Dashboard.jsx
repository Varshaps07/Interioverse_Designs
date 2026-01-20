import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Users from "./Users";
import "./Dash.css";
// import UserDetails from "./Userdetails";
import ProjectsPanel from "./ProjectsPanel";
import UserDetails from "./Userdetails";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar/>
      <Users/>
      <UserDetails>    </UserDetails>
        <ProjectsPanel></ProjectsPanel>
  
      {/* <UserDetails></UserDetails> */}


    </div>
  );
};

export default Dashboard;