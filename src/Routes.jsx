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
import Booking from "./Component/TrainerBook.jsx/Booking";
import AllTrainer from "./Dashboard/Admin/AllTrainer";
import AllSubscriber from "./Dashboard/Admin/AllSubscriber";
import AllApplied from "./Dashboard/Admin/AllApplied";
import Allmember from "./Dashboard/Trainer/Allmember";
import Activity from "./Dashboard/Member/Activity";
import RecommendPg from "./Dashboard/Member/RecommendPg";
import PrivateRoute from "./Component/Private/PrivateRoute";

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
        element: <PrivateRoute><BeATrainer></BeATrainer></PrivateRoute>,
      },
      {
        path: "/booknow",
        element: <PrivateRoute><Booking></Booking></PrivateRoute>
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
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      {
        path: "forum",
        element: <Forum></Forum>,
      },
      {
        path: "addclass",
        element: <AddClass></AddClass>,
      },
      {
        path: "alltrainers",
        element: <AllTrainer></AllTrainer>,
      },
      {
        path: "subscriber",
        element: <AllSubscriber></AllSubscriber>,
      },
      {
        path: "manageMember",
        element: <Allmember></Allmember>,
      },
      {
        path: "activity",
        element: <Activity></Activity>,
      },
      {
        path: "recommended",
        element: <RecommendPg></RecommendPg>,
      },
      {
        path: "appliedTrainer",
        element:<AllApplied></AllApplied>,
      },
    ],
  },
]);
