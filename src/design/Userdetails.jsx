import React from "react";
import "./Users.css";

const Userdetails = ({ user, onDelete }) => {
  if (!user) return null;

  const handleDelete = () => {
      onDelete(user.userProfileId);
    
  };

  return (
    <div className="user-details-panel">

    <div className="ud-header">
  <h3 className="ud-name">

    {user.isVerified && (
      <span className="verified-tick">✔ </span>
    )}

    <span className="ud-username">
      {user.username || user.name}
    </span>

  </h3>

  <p className="ud-type">{user.type}</p>
</div>


      {/* 🔹 BODY */}
      <div className="ud-body">
        <p><b>ID</b><span>{user.userProfileId}</span></p>
        <p><b>Email</b><span>{user.email}</span></p>
        <p><b>Phone</b><span>{user.phone}</span></p>
        <p><b>User Type</b><span>{user.type}</span></p>
        <p><b>Address</b><span>{user.address}</span></p>
        <p><b>Pincode</b><span>{user.pincode}</span></p>
        <p><b>Location</b><span>{user.location}</span></p>
        <p><b>Instagram</b><span>{user.instagram|| "-"}</span></p>
        <p><b>LinkedIn</b><span>{user.linkedin}</span></p>
        <p><b>Referral Count</b><span>{user.referralCount|| "-"}</span></p>
        <p><b>Specialization</b><span>{user.specialization}</span></p>
         <p><b>Experience</b><span>{user.experience}</span></p>
         <p><b>Project Volume</b><span>{user.projectVolume}</span></p> 
        {/* <p><b>Brand Name</b><span>{user.brand}</span></p>  */}
         {/* <p><b>Registered Name</b><span>{user.registeredName}</span></p>  */}
          {/* <p><b>Tag Line</b><span>{user.tagline|| "-"}</span></p> */}
        <p><b>Sign-Up Date</b><span>{user.signupDate}</span></p>  
          <button className="delete-btn" onClick={handleDelete}>
          Delete User
        </button>
      </div>

      {/* 🔹 FOOTER */}
      {/* <div className="ud-footer"> */}
      
      </div>
    // </div>
  );
};

export default Userdetails;
