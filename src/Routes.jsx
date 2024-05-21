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
import Balance from "./Dashboard/Admin/Balance";
import Update from "./Dashboard/Common/Update";
import ClassDetails from "./Layout/ClassDetails";
import ManageSlot from "./Dashboard/Trainer/ManageSlot";
import ProfileSettings from "./Dashboard/Member/ProfileSettings";

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
        path: "/classes/:id",
        element: <ClassDetails></ClassDetails>,
        loader: ({ params }) =>
          fetch(`https://server-psi-tawny-84.vercel.app/allClass/${params.id}`),
      },
      {
        path: "/trainer",
        element: <Trainer></Trainer>,
      },
      {
        path: "/newTrainer",
        element: (
          <PrivateRoute>
            <BeATrainer></BeATrainer>
          </PrivateRoute>
        ),
      },
      {
        path: "/booknow",
        element: (
          <PrivateRoute>
            <Booking></Booking>
          </PrivateRoute>
        ),
      },
      {
        path: "/trainer/:id",
        element: <TrainerDetails></TrainerDetails>,
        loader: ({ params }) =>
          fetch(
            `https://server-psi-tawny-84.vercel.app/application/${params.id}`
          ),
      },
      {
        path: "/community",
        element: <Community></Community>,
      },
      {
        path: "/community/:id",
        element: <PostDetail></PostDetail>,
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "forum",
        element: (
          <PrivateRoute>
            <Forum></Forum>
          </PrivateRoute>
        ),
      },
      {
        path: "addclass",
        element: (
          <PrivateRoute>
            <AddClass></AddClass>
          </PrivateRoute>
        ),
      },
      {
        path: "manageslot",
        element: (
          <PrivateRoute>
            <ManageSlot />
          </PrivateRoute>
        ),
      },
      {
        path: "alltrainers",
        element: (
          <PrivateRoute>
            <AllTrainer></AllTrainer>
          </PrivateRoute>
        ),
      },
      {
        path: "balance",
        element: (
          <PrivateRoute>
            <Balance></Balance>
          </PrivateRoute>
        ),
      },
      // {
      //   path: "updateProfile",
      //   element: <PrivateRoute><ProfileSettings></ProfileSettings></PrivateRoute> ,
      // },
      {
        path: "subscriber",
        element: (
          <PrivateRoute>
            <AllSubscriber></AllSubscriber>
          </PrivateRoute>
        ),
      },
      {
        path: "manageMember",
        element: (
          <PrivateRoute>
            <Allmember></Allmember>
          </PrivateRoute>
        ),
      },
      {
        path: "activity",
        element: (
          <PrivateRoute>
            <Activity></Activity>
          </PrivateRoute>
        ),
      },
      {
        path: "recommended",
        element: (
          <PrivateRoute>
            <RecommendPg></RecommendPg>
          </PrivateRoute>
        ),
      },
      {
        path: "appliedTrainer",
        element: (
          <PrivateRoute>
            <AllApplied></AllApplied>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
