import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Helmet } from "react-helmet-async";
import { AiFillInstagram } from "react-icons/ai";
import { FaUserCheck } from "react-icons/fa";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa6";
import { Link } from "react-router-dom";

const AllApplied = () => {
  const {
    data: appliedTrainers,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["appliedTrainers"],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:5000/application?role=member`
      );
      return response.data;
    },
  });

  

  const HandleAccept= async(id)=>{
    console.log(id)
    const updated = {
        role:'member',
        status:'rejected'
    }
    // await axios
    // .patch(`http://localhost:5000/application/${id}`, {role:'member'})
    // .then((res) => {
    //   console.log(res.data);
    // })
    // .error((error) => {
    //   console.log(error);
    // });
  }

  return (
    <div className="overflow-x-auto">
      <Helmet>
        <title>SpinFit | application</title>
      </Helmet>
      <table className="table">
        {/* head */}
        <thead>
          <tr className="bg-base-200 font-roboto text-[#dde244]">
            <th>No.</th>
            <th>Profile</th>
            <th>Name</th>
            <th>Email</th>
            <th>Weekly Available Time</th>
            <th>Satus</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {appliedTrainers?.map((item, index) => (
            <tr className="text-white font-roboto">
              <th>{index + 1}</th>
              <th>
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img
                      src={item.profileImage}
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div>
                </div>
              </th>
              <td className="capitalize">{item?.fullName}</td>
              <td>{item?.email}</td>
              <td>{item?.weeklyAvailableTime}</td>
              <td>
                <button
                  className="btn bg-[#dde244] text-black"
                  onClick={() =>
                    document.getElementById("my_modal_2").showModal()
                  }
                >
                  <FaUserCheck className="text-xl" />
                </button>
                <dialog id="my_modal_2" className="modal">
                  <div className="modal-box">
                    {item && (
                      <div className="card items-start bg-base-100  mt-10 rounded-none py-5 text-center text-lg">
                        
                        <div className="card-body px-0">
                          <div className="flex gap-3  items-end">
                            <h2 className="card-title text-4xl text-white font-oswald capitalize">
                              {item?.fullName}
                            </h2>
                            <span className="text-gray-300 font-roboto">
                              ( {item?.yearsOfExperience} years
                              experience )
                            </span>
                            <span className="text-gray-300 font-roboto">
                              ( Age:{item?.age} )
                            </span>
                          </div>
                          <div className=" mb-4 mt-2 badge badge-outline w-fit rounded-none px-5 py-3 border-[#dde244] font-medium uppercase text-[#dde244]">
                            {item?.specialization}
                          </div>
                          <div className="flex gap-3  ">
                            {item?.socialIcons.map((data) => (
                              <Link to={data?.link} key={data?.platform}>
                                <span className="w-12 h-12 text-black text-xl bg-[#dde244] rounded-full  flex justify-center items-center transition-transform transform hover:translate-y-[-10px] ease-in">
                                  {data?.platform === "Facebook" && (
                                    <FaFacebookF />
                                  )}
                                  {data?.platform === "Linkedin" && (
                                    <FaLinkedinIn/>
                                  )}
                                  {data?.platform === "Instagram" && (
                                    <AiFillInstagram />
                                  )}
                                  {/* Add more conditions based on your available icons */}
                                </span>
                              </Link>
                            ))}
                          </div>
                          <div className="mt-10 text-start">
                            {item?.skills?.map((data) => (
                              <>
                                <p className="capitalize text-gray-300 font-roboto">
                                  {data?.skill}
                                </p>
                                <progress
                                  className="progress  "
                                  value={data?.value}
                                  max="100"
                                ></progress>
                              </>
                            ))}
                          </div>
                          <div className="mt-10 text-start">
                          <h2 className="card-title text-2xl  text-[#dde244] mb-3 font-oswald capitalize">
                              Available Slot
                            </h2>
                            {item?.availableTimeSlot?.map((data) => (
                              <div className="grid grid-cols-2">
                                <p className="capitalize text-gray-300 font-roboto">
                                  {data?.day} : 
                                </p>
                                <p className="capitalize text-gray-300 font-roboto">
                                  {data?.slot}
                                </p>
                              </div>
                            ))}
                          </div>
                          <div className="flex gap-2 mt-5 justify-center ">
                            <button className="bg-[#dde244] rounded-none btn btn-outline btn-md border-0 text-black " onClick={()=>HandleAccept(item._id)}>Confirm</button>
                            <button className="bg-[#dde244] rounded-none btn btn-outline btn-md border-0 text-black">Reject</button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                  </form>
                </dialog>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllApplied;
