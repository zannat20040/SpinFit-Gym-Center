import React, { useContext } from "react";
import GoogleSignIn from "../Shared Component/GoogleSignIn";
import { Link } from "react-router-dom";
import Button from "../Shared Component/Button";
import { AuthContext } from "../AuthProvider/AuthProvider";

const SignupLayout = ({ HandleSignup }) => {

  return (
    <div className="container max-w-lg mx-auto h-screen ">
      {/* <form className="card-body p-2 " onSubmit={HandleSignup}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-400 font-roboto ">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white tracking-wider">
                Full name
              </span>
            </label>
            <input
              type="text"
              placeholder="name"
              className="input input-bordered rounded-none"
              required
              name="name"
            />
          </div>
          <div className="form-control">
            <label className="label ">
              <span className="label-text rounded-none text-white tracking-wider">
                Profile Image{" "}
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
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white tracking-wider">Email</span>
          </label>
          <input
            type="email"
            placeholder="email"
            className="input input-bordered rounded-none"
            required
            name="email"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white tracking-wider">
              Password
            </span>
          </label>
          <input
            type="password"
            placeholder="password"
            className="input input-bordered rounded-none"
            required
            name="password"
          />
        </div>
        <div className="form-control mt-6 text-center">
        <button className="uppercase tracking-widest  btn btn-outline bg-[#dde244] rounded-none"><span className='mr-6'>Register now</span> <FaArrowRightLong></FaArrowRightLong></button>
        </div>
      </form>
      <div className="flex gap-4 justify-center px-2 mt-4 text-white font-roboto">
        <p>Already have and account? </p>
        <Link to="/login" className="text-[#dde244] font-medium  ">
          Login
        </Link>
      </div>

      <div className="divider text-white">OR</div>

      <div className="flex gap-4 justify-center items-center px-2 mt-4 ">
        <GoogleSignIn label={"Continue with Google"}></GoogleSignIn>
      </div> */}
  
      <div className="flex gap-4 justify-center px-2 mt-4">
        <p>Already have and account? </p>
        <Link
          to="/authentication/login"
          className="text-green-700 font-medium  "
        >
          Login
        </Link>
      </div>
      <div className="flex gap-4 justify-center items-center px-2 mt-4">
        <p>Or, Create account with</p>
        <button
          className="w-10 h-10flex justify-center items-center text-lg text-white rounded-[50%]"
          
        >
          <img
            src="https://static-00.iconduck.com/assets.00/google-icon-2048x2048-czn3g8x8.png"
            alt=""
            className="avater rounded-full"
          />
        </button>
      </div>
    </div>
  );
};

export default SignupLayout;
