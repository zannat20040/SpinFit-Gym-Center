import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/spinfit-removebg-preview.png";
import usersData from "../../Custom hooks/usersData";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import ProfileSettings from "../Member/ProfileSettings";

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
      <ul className="menu p-4 w-80 min-h-screen z-50 sticky top-0 bg-slate-950 text-white hidden lg:flex ">
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
            <Link to="manageslot" className="p-2 font-roboto ">
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
            {/* <Link to="updateProfile" className="p-2 font-roboto ">
            Profile Settings
            </Link> */}
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
            <Link to="balance" className="p-2 font-roboto ">
              Balance
            </Link>
            <Link to="forum" className="p-2 font-roboto ">
              Add new Forum
            </Link>
          </div>
        )}
        <div className="flex flex-col gap-2 mt-5">
          <button  className="text-start p-2 font-roboto " onClick={()=>document.getElementById('my_modal_2').showModal()}>
            Update profile
          </button>

          {/* Open the modal using document.getElementById('ID').showModal() method */}
<dialog id="my_modal_2" className="modal p-0">
  <div className="modal-box p-0">
   <ProfileSettings />
  </div>
  <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
</dialog>


          <Link  className="p-2 font-roboto " onClick={HandleLogout}>
            Log out
          </Link>
        </div>
      </ul>
    </div>
  );
};

export default Sidebar;
