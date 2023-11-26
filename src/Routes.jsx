import { createBrowserRouter } from "react-router-dom";
import Root from "./Layout/Root";
import Error from "./Component/Error Page/Error";
import Home from "./Layout/Home";
import Login from "./Layout/Login";
import Signup from "./Layout/Signup";
import Gallery from "./Layout/Gallery";
import Dashboard from "./Dashboard/Common/Dashboard";


export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error></Error>,
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element:<Login></Login>,
      },
      {
        path: "/signup",
        element: <Signup></Signup>,
      },
      {
        path: "/gallery",
        element: <Gallery></Gallery>,
      },
      
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children:[
      
    ]
  },
]);
