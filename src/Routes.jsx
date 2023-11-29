import { createBrowserRouter } from "react-router-dom";
import Root from "./Layout/Root";
import Error from "./Component/Error Page/Error";
import Home from "./Layout/Home";
import Login from "./Layout/Login";
import Signup from "./Layout/Signup";
import Gallery from "./Layout/Gallery";
import Dashboard from "./Dashboard/Common/Dashboard";
import Forum from "./Dashboard/Common/Forum";
import AddClass from "./Dashboard/Trainer/AddClass";
import Classes from "./Layout/Classes";
import Community from "./Layout/Community";
import PostDetail from "./Component/Community/PostDetail";
import Trainer from "./Layout/Trainer";
import TrainerDetails from "./Layout/TrainerDetails";
import BeATrainer from "./Layout/BeATrainer";

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
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <Signup></Signup>,
      },
      {
        path: "/gallery",
        element: <Gallery></Gallery>,
      },
      {
        path: "/classes",
        element: <Classes></Classes>,
      },
      {
        path: "/trainer",
        element: <Trainer></Trainer>,
      },
      {
        path: "/newTrainer",
        element: <BeATrainer></BeATrainer>,
      },
      {
        path: "/trainer/:id",
        element: <TrainerDetails></TrainerDetails>,
        loader:({params})=>fetch(`http://localhost:5000/application/${params.id}`),
      },
      {
        path: "/community",
        element: <Community></Community>,
      },
      {
        path: "/community/:id",
        element: <PostDetail></PostDetail>,
        // loader: ({params}) => fetch(`http://localhost:5000/blog/${params.id}`),
      }
    ],
  },

  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "forum",
        element: <Forum></Forum>,
      },
      {
        path: "addclass",
        element: <AddClass></AddClass>,
      },
    ],
  },
]);
