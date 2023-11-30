import React, { useContext } from "react";
import { FaBars } from "react-icons/fa6";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import usersData from "../../Custom hooks/usersData";
import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../../assets/images/spinfit-removebg-preview.png";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
  const { data: userInfo, isLoading } = usersData();
  const navigate = useNavigate();

  const { signOutProfile } = useContext(AuthContext);
  const HandleLogout = () => {
    signOutProfile()
      .then(() => {
        navigate("/");
        swal("Good job!", "Logged out successfully!", "success");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="drawer h-screen">
      <Helmet>
        <title>SpinFit | dashboard</title>
      </Helmet>
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex relative">
        {/* Page content here */}
        <Sidebar className=""></Sidebar>
        <div className="w-full">
          <div className=" bg-slate-950 p-4  flex justify-between lg:justify-end sticky top-0 z-40 ">
            <label
              htmlFor="my-drawer"
              className="relative border-0 lg:hidden uppercase tracking-widest w-12 bg-[#dde244] rounded-none btn btn-primary drawer-button "
            >
              <FaBars className="text-4xl text-black "></FaBars>
            </label>

            <Navbar></Navbar>
          </div>

          <div className="px-4 bg-slate-900 pt-14 pb-40 ">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
      <div className="drawer-side  z-50">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <ul className="menu p-4 w-80 min-h-full bg-slate-950 text-white lg:hidden">
          <div className="bg-slate-900 p-4 flex justify-center">
            <Link to="/">
              <img src={logo} alt="" className="h-10" />
            </Link>
          </div>
          {userInfo?.role === "trainer" && (
            <div className="flex flex-col gap-2 mt-5 flex-grow">
              <Link to="addclass" className="p-2 font-roboto ">
                Add new Class
              </Link>
              <Link to="" className="p-2 font-roboto ">
                Manage Slots
              </Link>
              <Link to="manageMember" className="p-2 font-roboto ">
                Manage member
              </Link>
              <Link to="forum" className="p-2 font-roboto ">
                Add new Forum
              </Link>
            </div>
          )}
          {userInfo?.role === "member" && (
            <div className="flex flex-col gap-2 mt-5 flex-grow">
              <Link to="activity" className="p-2 font-roboto ">
                Activity Log
              </Link>
              <Link to="" className="p-2 font-roboto ">
                Profile Settings
              </Link>
              <Link to="recommended" className="p-2 font-roboto ">
                Recommended Classes
              </Link>
            </div>
          )}
          {userInfo?.role === "admin" && (
            <div className="flex flex-col gap-2 mt-5 flex-grow">
              <Link to="appliedTrainer" className="p-2 font-roboto ">
                Applied Trainer
              </Link>
              <Link to="alltrainers" className="p-2 font-roboto ">
                All Trainers
              </Link>
              <Link to="subscriber" className="p-2 font-roboto ">
                All Subscriber
              </Link>
              <Link to="/" className="p-2 font-roboto ">
                Balance
              </Link>
              <Link to="forum" className="p-2 font-roboto ">
                Add new Forum
              </Link>
            </div>
          )}

          <div className="flex flex-col gap-2 mt-5">
            <Link to="/" className="p-2 font-roboto ">
              Update profile
            </Link>
            <Link className="p-2 font-roboto " onClick={HandleLogout}>
              Log out
            </Link>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
