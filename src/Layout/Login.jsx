import React, { useContext } from "react";
import Button from "../Shared Component/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import RouteLabel from "../Shared Component/RouteLabel";
import { AuthContext } from "../AuthProvider/AuthProvider";

const Login = () => {
  
    
  return (
    <>
    <RouteLabel label={'login'}></RouteLabel>
  <div className="container max-w-lg mx-auto h-screen ">
  <form  onSubmit={HandleLogin} >
      <div className="form-control">
        <label className="label">
          <span className="label-text text-white tracking-wider">Your Email</span>
        </label>
        <input
          type="email"
          placeholder="username@site.com"
          className="input input-bordered rounded-none"
          required
          name="email"
        />
      </div>
      
      <div className="form-control">
        <label className="label">
          <span className="label-text text-white tracking-wider">Your Password</span>
        </label>
        <input
          type="password"
          placeholder="password"
          className="input input-bordered rounded-none"
          required
          name="password"
        />
       
      </div>
      <div className="form-control mt-6">
        <Button label={'Continue'}></Button>
      </div>
    </form>
    <div className="flex gap-4 justify-center px-2 mt-4 text-white font-roboto">
      <p>Don't you have any account? </p>
      <Link to="/signup" className="text-[#dde244]  font-medium  ">
        Signup
      </Link>
      </div>
      <div className="divider text-white">OR</div>
      <div className="flex gap-4 justify-center items-center px-2 mt-4 ">
       <Button label={'Continue with Google'} ></Button>
      </div>
  </div>
    </>
  );
};

export default Login;
