import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/spinfit-removebg-preview.png";
import usersData from "../../Custom hooks/usersData";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const Sidebar = () => {
  const {data:userInfo, isLoading} = usersData();
  const navigate = useNavigate()
    const { signOutProfile } = useContext(AuthContext);
  const HandleLogout = () => {
    signOutProfile()
      .then(() => {
        navigate('/')
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
    <div>
      <ul className="menu p-4 w-80 min-h-full bg-slate-950 text-white hidden lg:flex ">
        <div className="bg-slate-900 p-4 flex justify-center ">
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
            <Link to="/" className="p-2 font-roboto ">
              Manage member
            </Link>
            <Link to="forum" className="p-2 font-roboto ">
              Add new Forum
            </Link>
          </div>
        )}
        {userInfo?.role === "admin" && (
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
          <Link  className="p-2 font-roboto " onClick={HandleLogout}>
            Log out
          </Link>
        </div>
      </ul>
    </div>
  );
};

export default Sidebar;
