import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './design/Dashboard'

// import ProtectedRoute from './Redux/ProtectedRoute'
import Login from './Login/Login'
import Signup from './Signup/Signup'
import ProtectedRoute from './Routes/ProtectedRoute'

const App = () => {

  let router=createBrowserRouter([
    {
      path:"/",
      element:<Login></Login>
    },
    {
      path:"/admin-dashboard",
      element:
      (
        <ProtectedRoute role="admin"><Dashboard></Dashboard></ProtectedRoute>
      )

},{
      path: "/signup",
      element: (
        <ProtectedRoute role="user">
          <Signup />
        </ProtectedRoute>
      )
    }
])
  return (
       //<div>
        //{/* <Login></Login> */}
        //</div>


        <div>
          <RouterProvider router={router}></RouterProvider>
        </div>
  )
}

export default App