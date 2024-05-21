import React, { useContext } from "react";
import usersData from "../../Custom hooks/usersData";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Button from "../../Shared Component/Button";
import { MdModeEdit } from "react-icons/md";
import logo from "../../assets/images/spinfit-removebg-preview.png";

const ProfileSettings = () => {
  const { data: userInfo } = usersData();
  const { user } = useContext(AuthContext);

  console.log(userInfo, user);

  return (
    <div className="mx-auto my-10 flex max-w-[350px] flex-col items-center justify-center space-y-4 rounded-xl  relative  font-sans shadow-lg dark:bg-[#18181B] bg-slate-800">
      <div className="bg-slate-950 p-5 rounded-t-xl ">
        <img className="rounded-t-xl" src={logo} alt="" />
      </div>
      <div className="group absolute border-[6px] rounded-full top-24 border-white">
        <img
          className="w-28 h-28 border-2   object-cover rounded-full"
          src={user?.photoURL}
          alt="avatar navigate ui"
        />
        <div className="bg-[#dde244] w-8 h-8 p-2 rounded-full flex justify-center items-center absolute bottom-2 right-0 group-hover:w-full group-hover:h-full group-hover:bottom-0 group-hover:right-0 group-hover:bg-slate-700/60 duration-500 transition-all">
          <MdModeEdit className="text-black" />
        </div>
      </div>

      <div className=" text-center !mt-16 w-full p-8">
        <h1 className="font-bold text-white text-2xl font-roboto text-center capitalize">
          personal information
        </h1>
        <p className=" text-white  font-roboto text-center capitalize">
          {userInfo?.role}
        </p>

        <form className="grid grid-cols-1 gap-3 mt-6">
          <div className="form-control">
            <input
              type="text"
              placeholder="Full Name"
              className="input input-bordered rounded-none "
              required
              name="name"
              defaultValue={userInfo?.name}
            />
          </div>
          <div className="form-control">
            <input
              type="email"
              placeholder="Your email"
              className="input input-bordered rounded-none"
              required
              name="email"
              defaultValue={userInfo?.email}
              disabled
            />
          </div>
          <div className="form-control">
            <input
              type="number"
              placeholder="Your Phone Number"
              className="input input-bordered rounded-none "
              required
              name="numebr"
              defaultValue={user?.phoneNumber}
            />
          </div>
          <button className="uppercase tracking-widest text-black btn border-none btn-outline bg-[#dde244] rounded-none mb-10">Update profile</button>
        </form>
      </div>
    </div>

    // <div>
    //     <form>
    //         <div className='w-full h-96 rounded mb-10'>
    //         <img src={user?.photoURL} alt="" className='w-full h-full rounded'/>
    //         </div>

    //         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-400 font-roboto ">
    //   <div className="form-control">
    //     <label className="label">
    //       <span className="label-text text-white tracking-wider">
    //         Full name
    //       </span>
    //     </label>
    //     <input
    //       type="text"
    //       placeholder="name"
    //       className="input input-bordered rounded-none"
    //       required
    //       name="name"
    //       defaultValue={userInfo?.name}
    //     />
    //   </div>
    //   {/* <div className="form-control">
    //     <label className="label ">
    //       <span className="label-text rounded-none text-white tracking-wider">
    //         Profile Image{" "}
    //       </span>
    //     </label>
    //     <input
    //       type="file"
    //       className="file-input file-input-bordered w-full rounded-none "
    //       placeholder="photo url"
    //       required
    //       name="photo"
    //       accept="image/*"
    //     />
    //   </div> */}
    //      <div className="form-control ">
    //   <label className="label">
    //     <span className="label-text text-white tracking-wider">Email</span>
    //   </label>
    //   <input
    //     type="number"
    //     placeholder="phone number"
    //     className="input input-bordered rounded-none"
    //     required
    //     name="number"
    //     defaultValue={userInfo?.phoneNumber}
    //     disabled
    //   />
    // </div>

    // </div>
    // <div className="form-control mt-4">
    //   <label className="label">
    //     <span className="label-text text-white tracking-wider">Email</span>
    //   </label>
    //   <input
    //     type="email"
    //     placeholder="email"
    //     className="input input-bordered rounded-none"
    //     required
    //     name="email"
    //     defaultValue={userInfo?.email}
    //     disabled
    //   />
    // </div>
    // <div className="form-control mt-4">
    //   <label className="label">
    //     <span className="label-text text-white tracking-wider">
    //      Reset Password
    //     </span>
    //   </label>
    //   <input
    //     type="password"
    //     placeholder="password"
    //     className="input input-bordered rounded-none"
    //     required
    //     name="password"
    //   />
    // </div>
    // <div className="form-control mt-6 text-center">
    // <Button label={"Update profile"}></Button>
    // </div>
    //     </form>
    // </div>
  );
};

export default ProfileSettings;
