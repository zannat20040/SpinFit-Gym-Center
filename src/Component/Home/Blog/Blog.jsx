import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";

const Blog = () => {
  const [blogs, setblogs] = useState([]);
  useEffect(() => {
    axios
      .get("./blog.json")
      .then((res) => {
        setblogs(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 pb-32">
      <div>
        <h1 className="mb-5 text-6xl font-bold font-oswald text-white py-5">
          Our Recent <span className="text-6xl text-[#dde244] ">Blogs</span>
        </h1>
      </div>
      <div className="grid grid-cols-3 gap-5 ">
        {blogs.map((blog, index) => (
          <div className="card w-96 bg-gray-500 rounded-none group "  key={index}>
            <figure className="h-[250px]">
              <img
                src={blog.image}
                alt="Shoes"
                className="group-hover:scale-125  duration-300  transition ease-in-out delay-150"
              />
            </figure>
            <div className="card-body">
              <div className="flex justify-between">
                <div className="badge badge-outline rounded-none px-5 py-3 border-[#dde244] font-medium uppercase text-[#dde244]">
                  {blog.category}
                </div>
                <div className="font-medium uppercase text-black flex gap-3 items-center">
                <SlCalender></SlCalender>
                <span>{blog.date}</span>
                </div>
              </div>
              <h2 className="card-title text-2xl font-bold font-oswald  duration-300  transition ease-in-out delay-150 group-hover:text-[#dde244] mt-5">
                {blog.title}
              </h2>
              {blog.content.split(" ").length > 20 ? (
                <p className="text-white font-roboto">
                  {blog.content.split(" ").slice(0, 20).join(" ")}{" "}
                  <span className="font-bold text-[#dde244]">... </span>
                  <Link className="uppercase  text-[#dde244] font-medium rounded-none flex gap-3 items-center py-3">
                    <span className="inline">Read More</span>
                    <FaArrowRightLong className="inline"></FaArrowRightLong>
                  </Link>
                </p>
              ) : (
                <>
                  <p className="text-white font-roboto">{blog.content}</p>
                  <Link className="uppercase  text-[#dde244] font-medium rounded-none flex gap-3 items-center py-3">
                    <span className="inline">Read More</span>
                    <FaArrowRightLong className="inline"></FaArrowRightLong>
                  </Link>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
