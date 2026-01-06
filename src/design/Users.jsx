  import React, { useState } from "react";
import "./Users.css";
// import json from "./JSon/UserData.json";
import json from "../JSON/UserData.json"
import ProjectsPanel from "./ProjectsPanel";
import Userdetails from "./Userdetails";
import Nav from "../Nav/Nav";

const Users = () => {
const [users, setUsers] = useState(() => {
  const saved = localStorage.getItem("usersData");

  if (saved) return JSON.parse(saved);

  // First ever load only
  localStorage.setItem("usersData", JSON.stringify(json));
  return json;
});
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [allUsers] = useState(json)
  const [selectedUser, setSelectedUser] = useState(json[0]);


  const persistUsers = (data) => {
  localStorage.setItem("usersData", JSON.stringify(data));
};

const [showDeletePopup, setShowDeletePopup] = useState(false);
const [pendingDeleteId, setPendingDeleteId] = useState(null);

  
const [showVerifyPopup, setShowVerifyPopup] = useState(false);
const [verifyId, setVerifyId] = useState(null);


const deleteUser = (id) => {
  setPendingDeleteId(id);
  setShowDeletePopup(true);
};
const confirmDelete = () => {
  const updated = users.filter(u => u.userProfileId !== pendingDeleteId);
  setUsers(updated);
  persistUsers(updated);

  if (selectedUser?.userProfileId === pendingDeleteId) {
    setSelectedUser(updated[0] || null);
  }

  setShowDeletePopup(false);
};



const verifyUser = (id) => {
  setVerifyId(id);
  setShowVerifyPopup(true);
};
const confirmVerify = () => {
  const updated = users.map(u =>
    u.userProfileId === verifyId
      ? { ...u, status: u.status === "Verified" ? "Not Verified" : "Verified" }
      : u
  );

  setUsers(updated);
  persistUsers(updated);

  if (selectedUser?.userProfileId === verifyId) {
    setSelectedUser(updated.find(u => u.userProfileId === verifyId));
  }

  setShowVerifyPopup(false);
};






  const filters = (type) => {
    if (type === "Show all") {
      setUsers(allUsers);
      setFilter("All");
    } else {
      setUsers(allUsers.filter((u) => u.type === type));
      setFilter(type);
    }
  };

const filteredUsers = users.filter((u) => {
  const searchValue = search.toLowerCase();

  const matchSearch =
    u.name.toLowerCase().includes(searchValue) ||
    u.email.toLowerCase().includes(searchValue) ||
    String(u.userProfileId).includes(searchValue) ||   // 🔥 search by ID
    u.date.toLowerCase().includes(searchValue);        // 🔥 search by Date

  const matchFilter = filter === "All" || u.type === filter;

  return matchSearch && matchFilter;
});


  return (
    <div className="users-container">
   <Nav></Nav>
      <div className="users-content">
        <div className="outer">
          <div className="searchs" style={{display:"flex",gap:"1%", justifyContent:"center",alignItems:"center"}}>
          <input
            type="text"
            placeholder="Search here"
            className="search"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button style={{width:"15%",display:"flex", justifyContent:"center",alignItems:"center", marginTop:"0%" ,borderRadius:"3px",fontSize:"14px"}}>+ XYZ</button>
</div>

<div className="filters">
  {[
    { label: "Show all", value: "All" },
    { label: "Designer", value: "Designer" },
    { label: "Agent", value: "Agent" },
    { label: "User", value: "User" }
  ].map((btn) => (
   <button
  key={btn.value}
  className={filter === btn.value ? "active-filter" : ""}
  onClick={() => {
    setFilter(btn.value);

    const saved = JSON.parse(localStorage.getItem("usersData")) || users;

    if (btn.value === "All") {
      setUsers(saved);
    } else {
      setUsers(saved.filter(u => u.type === btn.value));
    }
  }}
>
  {btn.label}
</button>

  ))}
</div>



          <table>
            <thead>
              <tr>
                <th>UserProfile</th>
                <th>Name</th>
                <th>Email ID</th>
                <th>Date</th>
                <th>Projects</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((u) => (
                <tr
                  key={u.userProfileId}
                  onClick={() => setSelectedUser(u)}
                >
<td className="profile-id-cell">
  <img src={"https://thumbs.dreamstime.com/b/user-woman-icon-lady-s-profile-female-web-sign-flat-art-object-black-white-silhouette-girl-business-suit-avatar-picture-173159996.jpg"} className="user-avatar" alt="user" />
  <span>{u.userProfileId}</span>
</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.date}</td>
                  <td>{u.projects}</td>
                  <td>
                    <div className="status-cell">
                     <button
  className={`status-btn ${u.status === "Verified" ? "verified" : "not-verified"}`}
  onClick={(e) => {
    e.stopPropagation();
    verifyUser(u.userProfileId);
  }}
>
  {u.status === "Verified" ? "Verified" : "Not Verified"}
</button>

                      <button
                        className="delete-icon-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteUser(u.userProfileId);
                        }}



                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="right-panels">
          <Userdetails user={selectedUser} onDelete={deleteUser} />
          <ProjectsPanel user={selectedUser} />
        </div>
      </div>
      {showDeletePopup && (
  <div className="popup-overlay">
    <div className="popup-box">
      <h3>Delete User?</h3>
<p>
  Are you sure you want to delete user with ID 
  <b> {pendingDeleteId}</b> ?
</p>

      <div className="popup-actions">        <button className="danger" onClick={confirmDelete}>Delete</button>

        <button onClick={() => setShowDeletePopup(false)}>Cancel</button>
      </div>
    </div>
  </div>
)}
{showVerifyPopup && (
  <div className="popup-overlay">
    <div className="popup-box">
<h3>
  {users.find(u => u.userProfileId === verifyId)?.status === "Verified"
    ? "Mark user as Not Verified?"
    : "Verify this user?"}
</h3>

      <div className="popup-actions">
         <button className="danger" onClick={confirmVerify}>
          Confirm
        </button>
        <button onClick={() => setShowVerifyPopup(false)}>Cancel</button>
       
      </div>
    </div>
  </div>
)}


    </div>
  );
};

export default Users;