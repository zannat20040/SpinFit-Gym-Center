import React, { useState, useRef, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";
import Button from "../../Shared Component/Button";
import { imgUpload } from "../../Utils/imageUpload";
import usersData from "../../Custom hooks/usersData";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

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
    const currentDate = new Date('2023-11-27T00:00:00.000Z');
    let date = currentDate.toISOString().split('T')[0];
    const blog = {
      postDetail: {
        post: content,
        title: title,
        image: photo,
        date: date,
        category: category,
      },
      badge: badge,
      name: name,
      like: 0,
      dislike: 0,
    };

    axios
      .post("http://localhost:5000/blog", blog)
      .then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          toast.success("Blog posted successfully");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(blog);
  };

  return (
    <>
      <div className="container max-w-lg mx-auto h-screen ">
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
            <textarea className="textarea textarea-bordered h-32 w-full rounded-none " name="content" value='content' placeholder="Bio"></textarea>
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
