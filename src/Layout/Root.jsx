import React from "react";
import Navbar from "../Shared Component/Navbar";
import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Root = () => {
  return (
    <>
      <Helmet>
        <title>SpinFit </title>
      </Helmet>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </>
  );
};

export default Root;
