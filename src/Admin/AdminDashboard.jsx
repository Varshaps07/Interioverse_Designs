import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users,setUsers] = useState([]);

  const loadUsers = async()=>{
    const res = await axios.get("http://localhost:5000/api/admin/users",{withCredentials:true});
    setUsers(res.data);
  };

  const verifyUser = async(id)=>{
    await axios.put(`http://localhost:5000/api/admin/verify-user/${id}`,{}, {withCredentials:true});
    loadUsers();
  };

  const deleteUser = async(id)=>{
    await axios.delete(`http://localhost:5000/api/admin/delete-user/${id}`,{withCredentials:true});
    loadUsers();
  };

  useEffect(()=>{ loadUsers(); },[]);

  return (
    <div className="admin-container">
      <h2>Admin Panel</h2>
      <table border="1" width="100%">
        <tr>
          <th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Actions</th>
        </tr>
        {users.map(u=>(
          <tr key={u._id}>
            <td>{u.name}</td>
            <td>{u.email}</td>
            <td>{u.role}</td>
            <td>{u.isVerified ? "Verified":"Pending"}</td>
            <td>
              {!u.isVerified && <button onClick={()=>verifyUser(u._id)}>Verify</button>}
              <button onClick={()=>deleteUser(u._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default AdminDashboard;
