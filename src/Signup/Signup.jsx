import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import axiosInstance from "../api/axiosInstance";

const Signup = () => {
const [success, setSuccess] = useState("");

  const navigate = useNavigate();


  // const [error, setError] = useState("");
const [isSubmitted, setIsSubmitted] = useState(false);


  const [form, setForm] = useState({
    // userProfileId: "",
    username: "",
    email: "",
    phone: "",
    // password: "",
    type: "Designer",
    address: "",
    location: "",
    instagram: "",
    linkedin: "",
    experience: "",
    // projects: "",
    referralCount: "",
    specialization: "",
    projectVolume: "",
    // registeredName: "",
    tagline: "",
    // signupDate: "",
    pincode: "",
    brand: "",
    // date: ""
  });

  const [error, setError] = useState("");
  const [missingFields, setMissingFields] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });

    // Auto remove star when user types
    if (missingFields.includes(name)) {
      setMissingFields(missingFields.filter(f => f !== name));
    }
      setError("");

  }

  const showStar = (field) => {
    return missingFields.includes(field) ? (
      <span style={{ color: "red" }}> *</span>
    ) : null;
  };

  const validateForm = () => {
    let missing = [];
const optionalFields = ["instagram", "tagline", "referralCount"];

    for (let key in form) {
    if (!form[key] && !optionalFields.includes(key)) {
        missing.push(key);
      }
    }

    if (missing.length > 0) {
      setError("All fields are mandatory");
      setMissingFields(missing);
      return false;
    }
const emailRegex = /^[a-zA-Z0-9._%+-]+@[gmail]+\.[com]{2,}$/;

  if (!emailRegex.test(form.email)) {
    setError("Enter valid email format (example: user@gmail.com)");
    return false;
  }
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(form.phone)) {
      setError("Phone number must be exactly 10 digits");
      return false;
    }

    const pincodeRegex = /^[0-9]{6}$/;
    if (!pincodeRegex.test(form.pincode)) {
      setError("Pincode must be exactly 6 digits");
      return false;
    }



//  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

//   // Only validate AFTER submit click
//   if (isSubmitted) {

    // if (!form.email.trim()) {
    //   setError("Email is required");
    //   return false;
    // }

    // if (!emailRegex.test(form.email)) {
    //   setError("Enter valid email format (example: user@gmail.com)");
    //   return false;
    // }

  //   const phoneRegex = /^[0-9]{10}$/;
  //   if (!phoneRegex.test(form.phone)) {
  //     setError("Phone number must be exactly 10 digits");
  //     return false;
  //   }

  //   const pincodeRegex = /^[0-9]{6}$/;
  //   if (!pincodeRegex.test(form.pincode)) {
  //     setError("Pincode must be exactly 6 digits");
  //     return false;
  //   }
  // }



    setError("");
    setMissingFields([]);
    return true;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("Submit clicked");

  if (!validateForm()) {
    console.log("Validation failed");
    return;
  }

  try {
    console.log("Calling signup API...");

    const res = await axiosInstance.post(
      "auth/signup",
      form
    );

    console.log("Signup API Response:", res.data);

    alert("Signup Successful!");

    console.log("Navigating to login page...");

    navigate("/",{replace:true});

  } catch (err) {
    console.log("Signup error:", err);

    const msg = err.response?.data?.msg;

    if (msg) {
      setError(msg);
    } else {
      setError("Signup failed – please try again");
    }
  }
};

  return (
    <div className="signup-wrapper">
      <div className="signup-card">
        <h2>Create User Profile</h2>

        <form onSubmit={handleSubmit}>

          <div className="row-2">
            {/* <div className="field">
              <label>Profile ID{showStar("userProfileId")}</label>
              <input name="userProfileId" onChange={handleChange} />
            </div> */}

            <div className="field">
              <label>Name{showStar("username")}</label>
              <input name="username" onChange={handleChange} />
            </div>
          </div>

          <div className="row-3">
            <div className="field">
              <label>Email{showStar("email")}</label>
              <input name="email" onChange={handleChange} />
            </div>

            <div className="field">
              <label>Phone{showStar("phone")}</label>
              <input
                name="phone"
                maxLength="10"
                value={form.phone}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  handleChange({ target: { name: "phone", value } });
                }}
              />
            </div>

            <div className="field">
              <label>Type{showStar("type")}</label>
              <select name="type" onChange={handleChange}>
                <option>User</option>
                <option>Designer</option>
                <option>Agent</option>
              </select>
            </div>
          </div>

          <div className="row-2">
            <div className="field">
              <label>Address{showStar("address")}</label>
              <input name="address" onChange={handleChange} />
            </div>

            {/* <div className="field">
              <label>Password{showStar("password")}</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
              />
            </div> */}
          </div>

          <div className="row-2">
            <div className="field">
              <label>Location{showStar("location")}</label>
              <input name="location" onChange={handleChange} />
            </div>

            <div className="field">
              <label>Pincode{showStar("pincode")}</label>
              <input
                name="pincode"
                maxLength="6"
                value={form.pincode}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  handleChange({ target: { name: "pincode", value } });
                }}
              />
            </div>
          </div>

          <div className="row-3">
            <div className="field">
              <label>Instagram(Optional)</label>
              <input name="instagram" onChange={handleChange} />
            </div>

            <div className="field">
              <label>LinkedIn{showStar("linkedin")}</label>
              <input name="linkedin" onChange={handleChange} />
            </div>

            <div className="field">
              <label>Brand{showStar("brand")}</label>
              <input name="brand" onChange={handleChange} />
            </div>
          </div>

          <div className="row-3">
            <div className="field">
              <label>Referral Count(Optional)</label>
              <input name="referralCount" onChange={handleChange} />
            </div>

            <div className="field">
              <label>Experience{showStar("experience")}</label>
              <input name="experience" onChange={handleChange} />
            </div>

            <div className="field">
              <label>Project Volume{showStar("projectVolume")}</label>
              <input name="projectVolume" onChange={handleChange} />
            </div>
          </div>

          <div className="row-2">
            <div className="field">
              <label>Specialization{showStar("specialization")}</label>
              <input name="specialization" onChange={handleChange} />
            </div>

            {/* <div className="field">
              <label>Signup Date{showStar("signupDate")}</label>
              <input type="date" name="signupDate" onChange={handleChange} />
            </div> */}
          </div>

          <div className="row-1">
            <div className="field">
              <label>Tagline(Optional)</label>
              <input name="tagline" onChange={handleChange} />
            </div>
          </div>

          {/* ERROR MESSAGE SECTION */}
          {error && (
            <div
              style={{
                color: "red",
                textAlign: "center",
                marginTop: "10px",
                fontWeight: "bold",
              }}
            >
              {error}
            </div>
          )}

          <button type="submit" className="createbutton">
            Create Profile
          </button>

        </form>
      </div>
    </div>
  );
};

export default Signup;
