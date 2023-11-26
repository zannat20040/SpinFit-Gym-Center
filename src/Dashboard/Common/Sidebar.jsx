import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/spinfit-removebg-preview.png";

const Sidebar = () => {
  return (
    <div className="drawer-side ">
      <label
        htmlFor="my-drawer-2"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu  w-80 min-h-full text-white bg-slate-950 p-6">
        <div className="bg-slate-900 p-4 flex justify-center">
          <Link to="/" >
            <img src={logo} alt="" className="h-10" />
          </Link>
        </div>
        <div className="flex flex-col gap-2 mt-5 flex-grow">
          <Link to="/" className="p-2 font-roboto ">Add new Class</Link>
          <Link to="" className="p-2 font-roboto ">Manage Slots</Link>
          <Link to="/" className="p-2 font-roboto ">Manage member</Link>
          <Link to="forum" className="p-2 font-roboto ">Add new Forum</Link>
        </div>
        <div className="flex flex-col gap-2 mt-5">
          <Link to="/" className="p-2 font-roboto ">Update profile</Link>
          <Link to="/" className="p-2 font-roboto ">Log out</Link>
        </div>
      </ul>
    </div>
  );
};

export default Sidebar;
