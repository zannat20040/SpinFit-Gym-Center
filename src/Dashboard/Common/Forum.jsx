import React, { useState, useRef, useMemo, useEffect } from "react";
import Button from "../../Shared Component/Button";
import { imgUpload } from "../../Utils/imageUpload";
import usersData from "../../Custom hooks/usersData";
import axios from "axios";
import toast from "react-hot-toast";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Helmet } from "react-helmet-async";
import PageTitle from "./PageTitle";

const Forum = () => {
  const userInfo = usersData();

  const HandleForm = async (e) => {
    e.preventDefault();

    const form = e.target;
    const image = form.photo.files[0];
    const photo = await imgUpload(image);
    const category = form.category.value;
    const content = form.content.value;
    const title = form.title.value;
    const badge = userInfo.role;
    const name = userInfo.name;
    const blog = {
      postDetail: {
        post: content,
        title: title,
        image: photo,
        date: new Date(),
        category: category,
      },
      badge: badge,
      name: name,
      like: 0,
      dislike: 0,
      likedUser:[],
      dislikedUser:[]
    };

    axios
      .post("https://server-psi-tawny-84.vercel.app/blog", blog)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Blog posted successfully");
        }
      })
      .catch((error) => {
        console.log(error);
      });

  };

  return (
    <>
    <Helmet>
        <title>SpinFit | Add forum</title>
      </Helmet>
      <div className="container mx-auto h-full ">
        <PageTitle title={'Your blog'}></PageTitle>
        <form onSubmit={HandleForm}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-white">Write title</span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="Type here"
              className="input input-bordered w-full rounded-none mb-6 "
            />
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text text-white">Write Your blog</span>
            </label>
            <textarea className="textarea textarea-bordered h-32 w-full rounded-none " name="content"  placeholder="Write your content"></textarea>
          </div>
          <div className="grid grid-cols-2 gap-5 mt-5 ">
            <div className="form-control">
              <label className="label ">
                <span className="label-text rounded-none text-white tracking-wider">
                  Blog thumbnail{" "}
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
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text text-white">
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
                <option value="exercise">Exercise</option>
                <option value="equipment">Equipment</option>
                <option value="fitness">Fitness</option>
                <option value="general">General</option>
                <option value="yoga">Yoga</option>
                <option value="tips-&-tricks">Tips & Tricks</option>
                <option value="nutrition">Nutrition</option>
                <option value="events">Events</option>
                <option value="safety-tips">Safety Tips</option>
                <option value="home-gymnastics">Home Gymnastics</option>
                <option value="motivation">Motivation</option>
                <option value="challenges">Challenges</option>
                <option value="announcements">Announcements</option>
              </select>
            </div>
          </div>
          <div className="form-control mt-6 text-center">
            <Button label={"Post"} ></Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Forum;
