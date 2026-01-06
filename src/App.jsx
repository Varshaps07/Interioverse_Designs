import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './design/Dashboard'

import ProtectedRoute from './Redux/ProtectedRoute'
import Login from './Login/Login'

const App = () => {

  let router=createBrowserRouter([
    {
      path:"/",
      element:<Login></Login>
    },
    {
      path:"/users",
      element:
      (
        <ProtectedRoute><Dashboard></Dashboard></ProtectedRoute>
      )
// children:[
  
//       {
//       path:"user",
//       element:<Use></Use>
//     },
//     {
//       path:"users",
//       element:<Users></Users>
//     }

// ]

}])
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