import React, { useRef, useState } from "react";
import Button from "../../Shared Component/Button";
import usersData from "../../Custom hooks/usersData";
import toast from "react-hot-toast";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { imgUpload } from "../../Utils/imageUpload";
import PageTitle from "../Common/PageTitle";

const AddClass = () => {
  const { data: userInfo } = usersData();

  const HandleAddClass = async (e) => {
    e.preventDefault();

    const form = e.target;
    const classname = form.classname.value;
    const details = form.content.value;
    const email = form.email.value;
    const duration = form.duration.value;
    const name = form.name.value;
    const category = form.category.value;
    const image = form.photo.files[0];
    const photo = await imgUpload(image);

    const newClass = {
      name: classname,
      details: details,
      trainerEmail: email,
      trainerName: name,
      category: category,
      classDuration: duration,
      photo: photo,
    };
    axios
      .post("https://server-psi-tawny-84.vercel.app/allClass", newClass)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Your new class has been added");
        }
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error);
      });
  };

  return (
    <div className="container mx-auto ">
      <Helmet>
        <title>SpinFit | add class</title>
      </Helmet>
      <PageTitle title={'New class'}></PageTitle>
      <form className="card-body p-0" onSubmit={HandleAddClass}>
        {/* class name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white tracking-wider font-roboto">
              Class name
            </span>
          </label>
          <input
            type="text"
            placeholder="type here.."
            className="input input-bordered rounded-none"
            required
            name="classname"
          />
        </div>
        {/* class details */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-roboto  text-white tracking-wider">
              Class Details
            </span>
          </label>
          <textarea
            className="textarea textarea-bordered h-32 w-full rounded-none "
            name="content"
            placeholder="Write your content "
          ></textarea>
        </div>
        {/* class image */}
        <div className="form-control">
              <label className="label ">
                <span className="label-text rounded-none text-white tracking-wider font-roboto">
                Class Image
                </span>
              </label>
              <input
                type="file"
                className="file-input file-input-bordered w-full rounded-none "
                placeholder="photo url"
                required
                name="photo"
                accept="image/*"
              />
            </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-400 font-roboto ">
          {/* trainer name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white tracking-wider">
                Trainer's name
              </span>
            </label>
            <input
              type="text"
              defaultValue={userInfo.name}
              className="input input-bordered rounded-none"
              disabled
              name="name"
            />
          </div>
          {/* trainer email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white tracking-wider">
                Trainer's Email
              </span>
            </label>
            <input
              type="email"
              defaultValue={userInfo.email}
              disabled
              className="input input-bordered rounded-none"
              name="email"
            />
          </div>
        </div>
        {/* class catagory */}
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text text-white font-roboto">
              Select post catagory
            </span>
          </label>
          <select
            className="select select-bordered rounded-none"
            name="category"
          >
            <option disabled selected>
              Pick one
            </option>
            <option value="swimming">Swimming</option>
            <option value="cycling">Cycling</option>
            <option value="aerobics">Aerobics</option>
            <option value="cardio-kickboxing">Cardio Kickboxing</option>
            <option value="strength-training">Strength Training</option>
            <option value="martial-arts">Martial Art</option>
            <option value="dance">Dance</option>
            <option value="dance">Pilates</option>
            <option value="bootcamp">Bootcamp</option>
            <option value="mindfulness">Mindfulness</option>
            <option value="spinning">Spinning</option>
            <option value="zumba">Zumba</option>
            <option value="crossfit">CrossFit</option>
            <option value="yoga">Yoga</option>
          </select>
        </div>
        {/* class duration */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white tracking-wider font-roboto">
              Class Duration
            </span>
          </label>
          <input
            type="number"
            placeholder="duration time"
            className="input input-bordered rounded-none"
            required
            name="duration"
          />
        </div>
{/* button */}
        <div className="form-control mt-6 text-center">
          <Button label={"Add this class"}></Button>
        </div>
      </form>
    </div>
  );
};

export default AddClass;
