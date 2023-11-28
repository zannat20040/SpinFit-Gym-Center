import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import usersData from "../../Custom hooks/usersData";
import { FaBars } from "react-icons/fa6";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const userInfo = usersData();
  return (

<div className="flex gap-2 justify-end">
    <div className="flex flex-col items-end font-roboto">
      <span className="capitalize text-white">{userInfo?.name}</span>
      <span className="capitalize text-white">{userInfo?.role}</span>
    </div>
    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
      <div className="w-20 rounded-full border-2 ">
        <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
      </div>
    </label>
  </div>
  );
};

export default Navbar;
