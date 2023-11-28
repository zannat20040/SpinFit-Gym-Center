import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/spinfit-removebg-preview.png";
import usersData from "../../Custom hooks/usersData";

const Sidebar = () => {
  const userInfo = usersData();

  return (
    <div>
      <ul className="menu p-4 w-80 min-h-full bg-slate-950 text-white hidden lg:flex ">
        <div className="bg-slate-900 p-4 flex justify-center ">
          <Link to="/">
            <img src={logo} alt="" className="h-10" />
          </Link>
        </div>
        {userInfo.role === "member" && (
          <div className="flex flex-col gap-2 mt-5 flex-grow">
            <Link to="addclass" className="p-2 font-roboto ">
              Add new Class
            </Link>
            <Link to="" className="p-2 font-roboto ">
              Manage Slots
            </Link>
            <Link to="/" className="p-2 font-roboto ">
              Manage member
            </Link>
            <Link to="forum" className="p-2 font-roboto ">
              Add new Forum
            </Link>
          </div>
        )}
        {userInfo.role === "admin" && (
          <div className="flex flex-col gap-2 mt-5 flex-grow">
            <Link to="application" className="p-2 font-roboto ">
              Applied Trainer
            </Link>
            <Link to="" className="p-2 font-roboto ">
              All Trainers
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
          <Link to="/" className="p-2 font-roboto ">
            Log out
          </Link>
        </div>
      </ul>
    </div>
  );
};

export default Sidebar;
