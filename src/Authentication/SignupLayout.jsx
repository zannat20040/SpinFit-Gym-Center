import React, { useContext } from "react";
import GoogleSignIn from "../Shared Component/GoogleSignIn";
import { Link } from "react-router-dom";
import Button from "../Shared Component/Button";
import { AuthContext } from "../AuthProvider/AuthProvider";

const SignupLayout = ({ HandleSignup  }) => {

  const {loading} = useContext(AuthContext)


  return (
    <div className="container max-w-lg mx-auto h-screen pb-24 px-4">
      <form className="card-body p-2 " onSubmit={HandleSignup}>
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
          {loading ? (
            <button className="btn rounded-none bg-[#dde244]" >
              <span className="loading loading-dots loading-sm text-black"></span>
            </button>
          ) : (
            <Button label={"register now"}></Button>
          )}
        </div>
      </form>
      <div className="flex gap-4 justify-center px-2 mt-4 text-white font-roboto">
        <p>Already have and account? </p>
        <Link to="/login" className="text-[#dde244] font-medium  ">
          Login
        </Link>
      </div>

      <div className="divider text-white">OR</div>

        <GoogleSignIn label={"Continue with Google"}></GoogleSignIn>
      

     
    </div>
  );
};

export default SignupLayout;
