import React, { useEffect, useState } from "react";
import "./Users.css";
import ProjectsPanel from "./ProjectsPanel";
import Userdetails from "./Userdetails";
import Nav from "../Nav/Nav";
import axios from "axios";
import axiosInstance from "../api/axiosInstance";

const Users = () => {

const [users,setUsers] = useState([]);

useEffect(() => {
  axiosInstance.get("/admin/users", { withCredentials:true })
    .then(res => {

      const formatted = res.data.map((u,i)=>({

        _id: u._id,

        userProfileId: u.userProfileId || i+100,
        name: u.username || "",
        email: u.email || "",
date: u.signupDate ? u.signupDate : "-",
  projects: Array.isArray(u.projects) ? u.projects.length : 0,
        status: u.isVerified ? "Verified" : "Not Verified",
        type: u.type || "User",
        full: u
      }));



      formatted.sort((a, b) =>
  new Date(b.full.createdAt) - new Date(a.full.createdAt)
);


      setUsers(formatted);

      if (formatted.length > 0) {
        setSelectedUser(formatted[0].full);
      }
    });
}, []);

const [search, setSearch] = useState("");
const [filter, setFilter] = useState("All");
const [selectedUser, setSelectedUser] = useState(null); 

const [showDeletePopup, setShowDeletePopup] = useState(false);
const [pendingDeleteId, setPendingDeleteId] = useState(null);

const [showVerifyPopup, setShowVerifyPopup] = useState(false);
const [verifyId, setVerifyId] = useState(null);

const deleteUser = (id) => {
  setPendingDeleteId(id);
  setShowDeletePopup(true);
};

const confirmDelete = async () => {
  try {
await axiosInstance.delete(`/admin/users/${pendingDeleteId}`);


    const updated = users.filter(u => u._id !== pendingDeleteId);
    setUsers(updated);

  if (selectedUser?._id === pendingDeleteId) {
  setSelectedUser(updated.length > 0 ? updated[0].full : null);
}


    setShowDeletePopup(false);

  } catch (err) {
    alert("Delete failed from database");
    console.log(err);
  }
};

const verifyUser = (id) => {
  setVerifyId(id);
  setShowVerifyPopup(true);
};





const confirmVerify = async () => {
  try {
  const res = await axiosInstance.patch(
  `/admin/users/${verifyId}/verify`
);


    // res.data contains updated user from DB
    const updatedUser = res.data;

    const updatedList = users.map(u =>
      u._id === updatedUser._id
        ? {
            ...u,
            status: updatedUser.isVerified ? "Verified" : "Not Verified",
            full: updatedUser
          }
        : u
    );

    setUsers(updatedList);

    if (selectedUser?._id === updatedUser._id) {
      setSelectedUser(updatedUser);
    }

    setShowVerifyPopup(false);

  } catch (err) {
    alert("Verify failed from database");
  }
};


// 🔥 END OF FIXED PART





const filteredUsers = users.filter((u) => {
  const searchValue = search.toLowerCase();

  const name = u.username || u.name || "";
  const email = u.email || "";
  const id = String(u.userProfileId || "");
  const date = u.date || "";

  const matchSearch =
    name.toLowerCase().includes(searchValue) ||
    email.toLowerCase().includes(searchValue) ||
    id.includes(searchValue) ||
    date.toLowerCase().includes(searchValue);

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
      onClick={() => setFilter(btn.value)}
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
onClick={() => setSelectedUser(u.full)}
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
verifyUser(u._id);
}}
>
{u.status === "Verified" ? "Verified" : "Not Verified"}
</button>

<button
className="delete-icon-btn"
onClick={(e) => {
  e.stopPropagation();
  deleteUser(u._id);
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
Are you sure you want to delete 
<b>
{" "}{users.find(u => u._id === pendingDeleteId)?.name}
</b>
 ?
</p>

<div className="popup-actions">
<button className="danger" onClick={confirmDelete}>Delete</button>
<button onClick={() => setShowDeletePopup(false)}>Cancel</button>
</div>

</div>
</div>
)}

{showVerifyPopup && (
<div className="popup-overlay">
<div className="popup-box">

<h3>
{users.find(u =>  u._id === verifyId)?.status === "Verified"
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
