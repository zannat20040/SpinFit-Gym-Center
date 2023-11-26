import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import usersData from "../../Custom hooks/usersData";
import { FaBars } from "react-icons/fa6";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [isOpen,setIsOpen] = useState(false)
  const userInfo = usersData();
  // const HandleDrawer =()=>{
  //   setIsOpen(!isOpen)
  // }
  // console.log(isOpen)
  return (
    // <><input id="my-drawer-2" type="checkbox" className="drawer-toggle" /><div className="drawer-content  mb-20 lg:bg-slate-950 lg:h-fit flex justify-between py-4 px-4  items-end lg:items-start lg:justify-end">
    //   <label htmlFor="my-drawer-2"
    //     className="drawer-button lg:hidden uppercase tracking-widest  btn w-12 bg-[#dde244] rounded-none"
    //   >
        
    //   </label>
    //   <div className="flex gap-2">
    //     <div className="flex flex-col items-end font-roboto">
    //       <span className="capitalize text-white">{userInfo?.name}</span>
    //       <span className="capitalize text-white">{userInfo?.role}</span>
    //     </div>
    //     <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
    //       <div className="w-20 rounded-full border-2 ">
    //         <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
    //       </div>
    //     </label>
    //   </div>
    // </div></>
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
