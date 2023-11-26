import React, { useContext } from "react";
import { FaBars } from "react-icons/fa6";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import usersData from "../../Custom hooks/usersData";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const userInfo = usersData();
  console.log(userInfo);
  return (
    <div>
      <div className="drawer lg:drawer-open ">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <Navbar></Navbar>
        <Sidebar></Sidebar>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
