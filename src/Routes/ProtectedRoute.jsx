// // import axios from "axios";
// // import { useEffect, useState } from "react";
// // import { Navigate } from "react-router-dom";

// // const ProtectedRoute = ({ children, role }) => {
// //   const [status, setStatus] = useState("loading");

// //   useEffect(() => {
// //     axios
// //       .get("http://localhost:5000/api/auth/me", { withCredentials: true })
// //       .then((res) => {
// //         if (role && res.data.role !== role) {
// //           setStatus("deny");
// //         } else {
// //           setStatus("allow");
// //         }
// //       })
// //       .catch(() => setStatus("deny"));
// //   }, []);

// //   if (status === "loading") return null;
// //   if (status === "deny") return <Navigate to="/" replace />;

// //   return children;
// // };

// // export default ProtectedRoute;
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Navigate, useLocation } from "react-router-dom";

// const ProtectedRoute = ({ children, role }) => {
//   const [status, setStatus] = useState("loading");
//   const location = useLocation();

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/auth/me", { withCredentials: true })
//       .then((res) => {
//         if (role && res.data.role !== role) {
//           setStatus("deny");
//         } else {
//           setStatus("allow");
//         }
//       })
//       .catch(() => setStatus("deny"));
//   }, []);

//   if (status === "loading") return null;

//   if (status === "deny") {
//     return <Navigate to="/" replace state={{ from: location }} />;
//   }

//   return children;
// };

// export default ProtectedRoute;
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const ProtectedRoute = ({ children, role }) => {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    axiosInstance
      .get("/auth/me", { withCredentials: true })
      .then((res) => {
        if (!res.data.role) {
          setStatus("deny");
        } else if (role && res.data.role !== role) {
          setStatus("deny");
        } else {
          setStatus("allow");
        }
      })
      .catch(() => setStatus("deny"));
  }, [role]);

  if (status === "loading") return <h3> Loading....</h3>;

  if (status === "deny") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
