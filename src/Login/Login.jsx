// import React, { useState, useEffect } from "react";
// import "./Login.css";
// import { useNavigate } from "react-router-dom";
// import { loginSuccess } from "../Redux/AuthSlice";
// import { useDispatch } from "react-redux";
// import axios from "axios";
// import axiosInstance from "../api/axiosInstance";

// const Login = () => {


//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState({});

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

// useEffect(() => {
//   const checkUser = async () => {
//     try {
//       const res = await axiosInstance.get("/auth/me");

//       if (res.data.role === "admin") {
//         navigate("/admin-dashboard", { replace: true });
//       } else if (res.data.role === "user") {
//         navigate("/signup", { replace: true });
//       }
//     } catch (error) {
//       // silent fail – user not logged in
//     }
//   };

//   // SKIP auth check if user just logged out OR just signed up
//   const justLoggedOut = sessionStorage.getItem("justLoggedOut");
//   const justSignedUp = sessionStorage.getItem("justSignedUp");

//   if (justLoggedOut || justSignedUp) {
//     sessionStorage.removeItem("justLoggedOut");
//     sessionStorage.removeItem("justSignedUp");
//     return;          // DO NOT call /auth/me
//   }

//   checkUser();

// }, [navigate]);







//   // useEffect(() => {
//   //   const isAuth = JSON.parse(localStorage.getItem("isAuth"));
//   //   if (isAuth) {
//   //     navigate("/users", { replace: true });
//   //   }
//   // }, [navigate]);


// // useEffect(()=>{
// //   axios.get("http://localhost:5000/api/admin/users")
// //     .then(()=>navigate("/admin-dashboard"))
// //     .catch(()=>{});
// // },[]);



//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   let err = {};

//   if (!username) err.username = "Username is required";
//   if (!password) err.password = "Password is required";

//   setError(err);

//   if (Object.keys(err).length === 0) {
//     try {
//      const res = await axiosInstance.post("/auth/login",  {
//   username: username,
//   password: password
// }, { withCredentials:true });


//       dispatch(loginSuccess(res.data));

//       if (res.data.role === "admin") {
//         navigate("/admin-dashboard", { replace: true });
//       } else {
// navigate("/signup", { replace: true });
//       }
//     } catch (err) {
//       alert("Invalid credentials");
//     }
//   }
// };

//   return (
//     <>
//       <div className="login-navbar">
//         <img
//           src="https://interioverse.com/_next/static/media/header_logo.16f5c53e.png"
//           alt="Interioverse"
//           className="login-logo"
//         />
//       </div>

//       <div className="login-outer">
//         <div className="login2">
//           <div className="login">
//             <h2 style={{ color: "#1F425A" }}>Login to account</h2>

//             <form onSubmit={handleSubmit}>
//               <div className="inputs">
//                 <label>Username</label>
//                 <input
//                   type="text"
//                   placeholder="type here"
//                   value={username}
//                   onChange={(e) => {
//                     setUsername(e.target.value);
//                     if (error.username) setError(prev => ({ ...prev, username: "" }));
//                   }}
//                 />
//                 {error.username && <p className="error">{error.username}</p>}
//               </div>

//               <div className="inputs">
//                 <label>Password</label>
//                 <input
//                   type="password"
//                   value={password}
//                   onChange={(e) => {
//                     setPassword(e.target.value);
//                     if (error.password) setError(prev => ({ ...prev, password: "" }));
//                   }}
//                 />
//                 {error.password && <p className="error">{error.password}</p>}
//               </div>

//               <button type="submit">Verify</button>
// {/* <p 
//   onClick={() => navigate("/signup")} 
//   style={{ textAlign:"center", color:"#1F425A", cursor:"pointer", marginTop:"12px" }}
// >
//   Create new account
// </p> */}

              
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;  



import React, { useState, useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import logo from "../assets/logo.jpeg";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // 🔹 Check if already logged in
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axiosInstance.get("/auth/me");

        if (res.data.role === "admin") {
          navigate("/admin-dashboard", { replace: true });
        } else if (res.data.role === "user") {
          navigate("/signup", { replace: true });
        }
      } catch {
        // not logged in → stay on login page
      }
    };

    checkUser();
  }, [navigate]);

  // 🔹 Login submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Username and password required");
      return;
    }

    try {
      const res = await axiosInstance.post("/auth/login", {
        username,
        password,
      });

      if (res.data.role === "admin") {
        navigate("/admin-dashboard", { replace: true });
      } else {
        navigate("/signup", { replace: true });
      }
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <>
      <div className="login-navbar">
      
         <img src={"./assets/logo"} alt="Interioverse"
          className="login-logo"
        />
      </div>

      <div className="login-outer">
        <div className="login2">
          <div className="login">
            <h2 style={{ color: "#1F425A" }}>Login to account</h2>

            <form onSubmit={handleSubmit}>
              <div className="inputs">
                <label>Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="inputs">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error && <p className="error">{error}</p>}

              <button type="submit">Verify</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
